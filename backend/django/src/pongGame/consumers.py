# consumers.py
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .twoPlayerMode import PongGame
from collections import deque
import json
import logging
from asgiref.sync import async_to_sync
from urllib.parse import parse_qs
# from users.views import get_user

logger = logging.getLogger('django')
group_game_instances = {}

matching_queue = {
    "2p": deque(),
    "3p": deque(),
    "4p": deque(),
    "tournament": deque(),
}

limit_size = {
    "2p": 2,
    "3p": 3,
    "4p": 4,
    "tournament": 4,
}

room_id = {
    "2p": 0,
    "3p": 0,
    "4p": 0,
    "tournament": 0,
}


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        global matching_queue, limit_size, room_cnt

        logger.info(f'scope : {self.scope}')
        logger.info(f'query_string : {self.scope["query_string"]}')

        query_string = self.scope["query_string"]
        query_str = query_string.decode("utf-8")
        parsed_query = parse_qs(query_str)
        mode = parsed_query.get('mode', [None])[0]
        userId = parsed_query.get('userId', [None])[0]

        if None in (userId, mode):
            return

        logger.info('mode = %s', str(mode))
        logger.info('userId = %s', str(userId))
        # user = get_user(self.scope["access_token"])
        # logger.info(user)
        # if mode not in ('2p', '3p', '4p', 'tournament') or user.pk != userId:
        #     return

        await self.accept()

        logger.info('여긴가 ?')
        logger.info(f'queue : {matching_queue[mode]}')
        # 큐에 넣기

        matching_queue[mode].appendleft((userId, self))
        self.userId = userId
        if (len(matching_queue[mode]) >= limit_size[mode]):
            logger.info('hihi im sun')
            self.room_name = str(room_id[mode]) + '_' + mode
            self.room_group_name = self.room_name + '_group'
            logger.info("room_group_name = %s", self.room_group_name)
            room_id[mode] += 1

            # 그룹에 대한 게임 인스턴스가 존재하지 않으면 생성
            group_game_instances[self.room_group_name] = PongGame()

            # 게임 인스턴스를 현재 소비자 인스턴스에 할당
            self.game = group_game_instances[self.room_group_name]

            for _ in range(limit_size[mode]):
                playerId, player = matching_queue[mode].pop()
                logger.info(
                    f'playerId : {playerId}, player : {player}, channel_name : {player.channel_name}')

                player.game = self.game
                player.update_task = asyncio.create_task(player.game_update_task())
                await player.channel_layer.group_add(
                    self.room_group_name,
                    player.channel_name
                )

            # 게임 업데이트 작업 시작

    # 게임 상태 업데이트 및 그룹에 전송
    async def game_update_task(self):
        while True:
            await asyncio.sleep(0.01)  # 게임 상태 업데이트 주기
            game_data = self.game.update()  # 게임 상태 업데이트
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