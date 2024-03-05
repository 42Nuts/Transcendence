# consumers.py
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .twoPlayerMode import PongGame
import json
import logging
from asgiref.sync import async_to_sync

logger = logging.getLogger('django')

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        logger.info('hihi sun')
        self.game = PongGame()
        self.update_task = None

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'game_%s' % self.room_name

        logger.info('hihi yim')
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        logger.info('websocket connect')
        await self.accept()
        self.update_task = asyncio.ensure_future(self.game_update_task())

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        if self.update_task:
            self.update_task.cancel()

    async def game_update_task(self):
        while True:
            await asyncio.sleep(0.01)  # 화면 업데이트 주기
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
        self.game.update(user_input)  # 사용자 입력에 따라 게임 상태 업데이트 (화면에는 즉시 반영되지 않음)

    async def game_update(self, event):
        game_data = event['game_data']
        # WebSocket을 통해 게임 데이터 전송
        await self.send(text_data=json.dumps(game_data))
