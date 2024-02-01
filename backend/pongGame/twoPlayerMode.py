import asyncio
import json
import math

class GameCanvas:
    def __init__(self, width, height, paddle_length):
        self.width = width
        self.height = height
        self.paddle_length = paddle_length

class GameBall:
    def __init__(self, x, y, radius, velocity_x, velocity_y, speed, color):
        self.x = x
        self.y = y
        self.radius = radius
        self.velocity_x = velocity_x
        self.velocity_y = velocity_y
        self.speed = speed
        self.color = color

    def to_dict(self):
        return {
            "x": self.x, 
            "y": self.y, 
            "radius": self.radius, 
            "color": self.color
        }

class Paddle:
    def __init__(self, x, y, width, height, score, color, leftArrow, rightArrow, id):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.score = score
        self.color = color
        self.leftArrow = leftArrow  
        self.rightArrow = rightArrow
        self.id = id

    def to_dict(self):
        return {
            "x": self.x, 
            "y": self.y, 
            "score": self.score, 
            "width": self.width, 
            "height": self.height, 
            "color": self.color
        }

class PongGame:
    def __init__(self):
        self.canvas = GameCanvas(width=600, height=500, paddle_length=100)
        self.players = []

        self.players.append(Paddle(
            x=(self.canvas.width - self.canvas.paddle_length) / 2,
            y=self.canvas.height - 20,
            width=100,
            height=10,
            score=0,
            color="white",
            leftArrow=False,
            rightArrow=False,
            id="player1"
        ))

        self.players.append(Paddle(
            x=(self.canvas.width - self.canvas.paddle_length) / 2,
            y=10,
            width=100,
            height=10,
            score=0,
            color="WHITE",
            leftArrow=False,
            rightArrow=False,
            id="player2"
        ))

        self.player_map = {player.id: player for player in self.players}

        self.ball = GameBall(
            x=self.canvas.width / 2,
            y=self.canvas.height / 2,
            radius=10,
            velocity_x=5,
            velocity_y=5,
            speed=7,
            color="WHITE"
        )

    def resetBall(self):
        self.ball.x = self.canvas.width / 2
        self.ball.y = self.canvas.height / 2
        self.ball.velocity_x = -5 if self.ball.velocity_x > 0 else 5
        self.ball.velocity_y = -5 if self.ball.velocity_y > 0 else 5
        self.ball.speed = 7

    def collision(self, b, p):
        p.top = p.y
        p.bottom = p.y + p.height
        p.left = p.x
        p.right = p.x + p.width

        b.top = b.y - b.radius
        b.bottom = b.y + b.radius
        b.left = b.x - b.radius
        b.right = b.x + b.radius

        return p.left < b.right and p.top < b.bottom and p.right > b.left and p.bottom > b.top

    def update(self, user_input=None):
        # score
        if self.ball.y - self.ball.radius < 0:
            self.players[1].score += 1
            self.resetBall()
        elif self.ball.y + self.ball.radius > self.canvas.height:
            self.players[0].score += 1
            self.resetBall()
        
        # 공의 위치 변경
        self.ball.x += self.ball.velocity_x
        self.ball.y += self.ball.velocity_y

        # computer ai
        self.players[1].x += ((self.ball.x - (self.players[1].x + self.players[1].width / 2)) * 0.1)

        # 공의 벽 튕김
        if self.ball.x - self.ball.radius < 0:
            self.ball.velocity_x = -self.ball.velocity_x
            self.ball.x = self.ball.radius 
        elif self.ball.x + self.ball.radius > self.canvas.width:
            self.ball.velocity_x = -self.ball.velocity_x
            self.ball.x = self.canvas.width - self.ball.radius

        # 공의 위치에 따른 플레이어 확인
        player = self.players[0] if self.ball.y + self.ball.radius > self.canvas.height / 2 else self.players[1]

        # 플레이어가 누군지에 따라 공이 중앙에 가까울 수록 0도, 끝에 가까울 수록 45도로 튕기게 설정
        if self.collision(self.ball, player):
            collidePoint = (self.ball.x - (player.x + player.width / 2))
            collidePoint /= (player.width / 2)

            angleRad = (math.pi / 4) * collidePoint

            direction = 1 if self.ball.y + self.ball.radius < self.canvas.height / 2 else -1

            # 스피드를 공의 움직임에 적용
            self.ball.velocity_x = self.ball.speed * math.sin(angleRad)
            self.ball.velocity_y = direction * self.ball.speed * math.cos(angleRad)

            # 게임 중 스피드가 점차 증가
            self.ball.speed += 0.1

        # 키보드 입력에 따른 변수 변화
        if user_input:
            player_id = user_input.get("playerId")
            player = self.player_map.get(player_id)

            if player:
                player.leftArrow = user_input.get("leftArrow", False)
                player.rightArrow = user_input.get("rightArrow", False)

                # 두 키가 동시에 눌렸을 경우 움직임 없음
        for cur in self.players:
           if cur.leftArrow and cur.rightArrow:
               continue

           if cur.leftArrow and cur.x > 0:
               cur.x -= 8
           if cur.rightArrow and cur.x < self.canvas.width - cur.width:
               cur.x += 8

        # 프론트엔드에 필요한 정보 보내기
        return {
            "ball": self.ball.to_dict(),
            "players": [player.to_dict() for player in self.players]
        }

