# consumers.py
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .twoPlayerMode import twoPlayer
from .threePlayerMode import threePlayer
from .fourPlayerMode import fourPlayer
from .tournamentMode import tournament
from .onePlayerMode import onePlayer
from collections import deque
import json
import logging
from asgiref.sync import async_to_sync
from urllib.parse import parse_qs
# from users.views import get_user

logger = logging.getLogger('django')
group_game_instances = {}
group_member_count = {}
tournament_winner_room = {}

matching_queue = {
    "1p": deque(),
    "2p": deque(),
    "3p": deque(),
    "4p": deque(),
    "tournament": deque(),
    "tournament2": deque(),
}

limit_size = {
    "1p": 1,
    "2p": 2,
    "3p": 3,
    "4p": 4,
    "tournament": 4,
    "tournament2": 2,
}

room_id = {
    "1p": 0,
    "2p": 0,
    "3p": 0,
    "4p": 0,
    "tournament": 0,
    "torunament2": 0,
}


class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.input_buffer = [] 
        self.mode = None
        self.userId = None

    async def connect(self):
        global matching_queue, limit_size, room_cnt

        logger.info(f'scope : {self.scope}')
        logger.info(f'query_string : {self.scope["query_string"]}')

        query_string = self.scope["query_string"]
        query_str = query_string.decode("utf-8")
        parsed_query = parse_qs(query_str)
        mode = parsed_query.get('mode', [None])[0]
        userId = parsed_query.get('userId', [None])[0]
        nextRoom = parsed_query.get('nextRoom', [None])[0]

        if None in (userId, mode):
            await self.close()
            return


        logger.info('mode = %s', str(mode))
        logger.info('userId = %s', str(userId))
        # user = get_user(self.scope["access_token"])
        # logger.info(user)
        # if mode not in ('2p', '3p', '4p', 'tournament') or user.pk != userId:
        #     return

        await self.accept()

        logger.info(f'queue : {matching_queue[mode]}')
        # 큐에 넣기

        self.mode = mode
        self.userId = userId
        if mode == "tournament2":
            if nextRoom not in tournament_winner_room:
                tournament_winner_room[nextRoom] = []

            tournament_winner_room[nextRoom].append(self)
            if len(tournament_winner_room[nextRoom]) >= 2:
                await self.final_tournament_round(nextRoom, tournament_winner_room[nextRoom])

        else:
            matching_queue[mode].appendleft((userId, self))
            if (len(matching_queue[mode]) >= limit_size[mode]):
                self.room_name = str(room_id[mode]) + '_' + mode
                self.room_group_name = self.room_name + '_group'
                logger.info("room_group_name = %s", self.room_group_name)
                room_id[mode] += 1

                player_ids = []
                players = []

                for _ in range(limit_size[mode]):
                    playerId, player = matching_queue[mode].popleft()
                    player_ids.append(playerId)
                    players.append(player)
                    logger.info(
                    f'playerId : {playerId}, player : {player}, channel_name : {player.channel_name}')


                # 그룹에 대한 게임 인스턴스가 존재하지 않으면 생성
                if self.room_group_name not in group_game_instances:
                    if mode == "1p":
                        group_game_instances[self.room_group_name] = onePlayer(player_ids)
                    elif mode == "2p":
                        group_game_instances[self.room_group_name] = twoPlayer(player_ids)
                    elif mode == "3p":
                        group_game_instances[self.room_group_name] = threePlayer(player_ids)
                    elif mode == "4p":
                        group_game_instances[self.room_group_name] = fourPlayer(player_ids)
                    elif mode == "tournament":
                        await self.start_tournament(player_ids, players)
                        return
                    else:
                        await self.close()
                        return

                self.game = group_game_instances[self.room_group_name]
                group_member_count[self.room_group_name] = limit_size[mode]

                for player in players:
                    player.game = self.game
                    player.room_group_name = self.room_group_name
                    await player.channel_layer.group_add(
                        self.room_group_name,
                        player.channel_name
                    )
                    player.update_task = asyncio.create_task(player.game_update_task())

                await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'game_start',
                            'game_start': player_ids,
                        }
                    )

    async def start_tournament(self, player_ids, players):
        room1 = self.room_group_name + "_1"
        room2 = self.room_group_name + "_2"

        group_game_instances[room1] = twoPlayer(player_ids[0:2])
        group_game_instances[room2] = twoPlayer(player_ids[2:4])
        group_member_count[room1] = 2
        group_member_count[room2] = 2

        for player in players[0:2]:
            player.game = group_game_instances[room1]
            player.room_group_name = room1
            await player.channel_layer.group_add(
                player.room_group_name,
                player.channel_name
            )
            player.update_task = asyncio.create_task(player.game_update_task())

        await self.channel_layer.group_send(
            room1,
            {
                'type': 'game_start',
                'game_start': player_ids[0:2],
            }
        )

        for player in players[2:4]:
            player.game = group_game_instances[room2]
            player.room_group_name = room2
            await player.channel_layer.group_add(
                player.room_group_name,
                player.channel_name
            )
            player.update_task = asyncio.create_task(player.game_update_task())
        

        await self.channel_layer.group_send(
            room2,
            {
                'type': 'game_start',
                'game_start': player_ids[2:4],
            }
        )
    
    async def final_tournament_round(self, winner_room_name, winners):
        winnerIds = []
        for winner in winners:
            winnerIds.append(winner.userId)

        group_game_instances[winner_room_name] = twoPlayer(winnerIds)
        group_member_count[winner_room_name] = 2
        self.game = group_game_instances[winner_room_name]

        logger.info(f'winners : {winners}')
        logger.info(f'newGame : {group_game_instances[winner_room_name]}')
        for winner in winners:
            await winner.channel_layer.group_add(
                winner_room_name,
                winner.channel_name
            )
            winner.game = self.game
            winner.room_group_name = winner_room_name
            self.update_task = asyncio.create_task(self.game_update_task())

        logger.info('before send')
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_start',
                'game_start': winnerIds,
            }
        )
        logger.info('after send')



    async def disconnect(self, close_code):
        logger.info(f'disconnect')
        logger.info(f'queue:{matching_queue[self.mode]}')

        idx = 0           
        for playerId, player in matching_queue[self.mode]:
            if playerId == self.userId:
                del matching_queue[self.mode][idx]
                self.close()
                return
            idx += 1

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        if self.update_task:
            self.update_task.cancel()

        logger.info(f'close_code : {close_code}')
        if self.mode == "tournament" and group_member_count[self.room_group_name] == 2:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_end',
                    'message': "game end",
                }
            )
        elif group_member_count[self.room_group_name] == limit_size[self.mode]:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'game_end',
                    'message': "game end",
                }
            )

        group_member_count[self.room_group_name] -= 1
        if group_member_count[self.room_group_name] == 0:
            del group_game_instances[self.room_group_name]  # 게임 인스턴스 삭제
            del group_member_count[self.room_group_name]  # 참여자 수 추적 삭제

        await self.close()

    # 게임 상태 업데이트 및 그룹에 전송
    # member 제거
    async def game_update_task(self):
        await asyncio.sleep(2.1)
        while True:
            logger.info(self.userId)
            await asyncio.sleep(0.01)  # 게임 상태 업데이트 주기

            # if self.input_buffer:
                # user_input = self.input_buffer.pop(0)
                # game_data = self.game.update(user_input)
            # else:
            game_data = self.game.update()  # 게임 상태 업데이트

            logger.info(f'room_group_name : {self.room_group_name}')
            logger.info(f'after_update : {self.room_group_name}')

            if game_data.get('winner') is not None:
                if self.mode == "tournament":
                    winner_room_name = self.room_group_name.rsplit("_", 1)[0]
                    game_data['next_room'] = winner_room_name

                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_update',
                        'game_data': game_data
                    }
                )
                await self.disconnect()
                return
            else:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'game_update',
                        'game_data': game_data
                    }
                )

    async def receive(self, text_data):
        user_input = json.loads(text_data)
        logger.info(f'text_data : {user_input}')
        logger.info(f'self : {self}')
        logger.info(f'self.game : {self.game}')
        logger.info('---------------')
        self.game.update(user_input)  # 사용자 입력에 따른 게임 상태 업데이트
    
    async def game_update(self, event):
        game_data = event['game_data']
        await self.send(text_data=json.dumps(game_data))

    async def game_end(self, event):
        await self.send(text_data=json.dumps({'type' : 'game_end'}))

    async def game_start(self, event):
        player_ids = event['game_start']
        await self.send(text_data=json.dumps({'type' : 'game_start', 'player_ids' : player_ids}))