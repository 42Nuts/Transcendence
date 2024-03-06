# consumers.py
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .twoPlayerMode import PongGame
import json
import logging
from asgiref.sync import async_to_sync

logger = logging.getLogger('django')

group_game_instances = {}

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'game_%s' % self.room_name

        # 그룹에 대한 게임 인스턴스가 존재하지 않으면 생성
        if self.room_group_name not in group_game_instances:
            group_game_instances[self.room_group_name] = PongGame()
 
        # 게임 인스턴스를 현재 소비자 인스턴스에 할당
        self.game = group_game_instances[self.room_group_name]

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        # 게임 업데이트 작업 시작
        self.update_task = asyncio.create_task(self.game_update_task())

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        if self.update_task:
            self.update_task.cancel()

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
        self.game.update(user_input)  # 사용자 입력에 따른 게임 상태 업데이트

    async def game_update(self, event):
        game_data = event['game_data']
        await self.send(text_data=json.dumps(game_data))