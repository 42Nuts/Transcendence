# consumers.py
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .twoPlayerMode import PongGame
import json

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game = PongGame()
        self.update_task = None

    async def connect(self):
        await self.accept()
        self.update_task = asyncio.ensure_future(self.game_update_task())

    async def disconnect(self, close_code):
        if self.update_task:
            self.update_task.cancel()

    async def game_update_task(self):
        while True:
            await asyncio.sleep(0.01)  # 화면 업데이트 주기
            game_data = self.game.update()  # 게임 상태 업데이트
            await self.send(text_data=json.dumps(game_data))

    async def receive(self, text_data):
        user_input = json.loads(text_data)
        self.game.update(user_input)  # 사용자 입력에 따라 게임 상태 업데이트 (화면에는 즉시 반영되지 않음)
