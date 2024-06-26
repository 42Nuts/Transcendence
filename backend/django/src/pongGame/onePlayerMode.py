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
    def __init__(self, x, y, width, height, score, color, leftArrow, rightArrow, a_press, d_press, id, angle):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.score = score
        self.color = color
        self.leftArrow = leftArrow  
        self.rightArrow = rightArrow
        self.a_press = a_press
        self.d_press = d_press
        self.id = id
        self.angle = angle

    def to_dict(self):
        return {
            "x": self.x, 
            "y": self.y, 
            "score": self.score, 
            "width": self.width, 
            "height": self.height, 
            "color": self.color,
            "angle": self.angle,
            "playerId": self.id
        }

class onePlayer:
    def __init__(self, player_ids):
        self.canvas = GameCanvas(width=700, height=700, paddle_length=100)
        self.players = []
        self.winner = None

        self.players.append(Paddle(
            x=(self.canvas.width - self.canvas.paddle_length) / 2,
            y=self.canvas.height - 20,
            width=100,
            height=10,
            score=0,
            color="white",
            leftArrow=False,
            rightArrow=False,
            a_press=False,
            d_press=False,
            angle = 0,
            id=player_ids[0]
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
            a_press=False,
            d_press=False,
            angle = 180,
            id=player_ids[0]
        ))

        self.player_map = {player.id: player for player in self.players}

        self.ball = GameBall(
            x=self.canvas.width / 2,
            y=self.canvas.height / 2,
            radius=15,
            velocity_x=3,
            velocity_y=3,
            speed=6,
            color="WHITE"
        )

    def reset_ball(self):
        self.ball.x = self.canvas.width / 2
        self.ball.y = self.canvas.height / 2
        self.ball.velocity_x = -3 if self.ball.velocity_x > 0 else 3
        self.ball.velocity_y = -3 if self.ball.velocity_y > 0 else 3
        self.ball.speed = 6

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

    def update_player_movement(self, index, player):
        if player.leftArrow and player.rightArrow:
            return
        if player.a_press and player.d_press:
            return
        if index == 0:
            if player.leftArrow and player.x > 0:
                player.x -= 8
            if player.rightArrow and player.x < self.canvas.width - player.width:
                player.x += 8
        if index == 1:
            if player.a_press and player.x > 0:
                player.x -= 8
            if player.d_press and player.x < self.canvas.width - player.width:
                player.x += 8
    
    def check_winner(self):
        for player in self.players:
            if player.score >= 5:
                self.winner = player.id
                return True
        return False

    def update(self, user_input=None):
        # score
        if self.ball.y - self.ball.radius < 0:
            self.players[0].score += 1
            self.reset_ball()
        elif self.ball.y + self.ball.radius > self.canvas.height:
            self.players[1].score += 1
            self.reset_ball()
        
        # 공의 위치 변경
        self.ball.x += self.ball.velocity_x
        self.ball.y += self.ball.velocity_y

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
            for player in self.players:
                player.leftArrow = user_input.get("leftArrow", False)
                player.rightArrow = user_input.get("rightArrow", False)
                player.a_press = user_input.get("a_press", False)
                player.d_press = user_input.get("d_press", False)

        for index, player in enumerate(self.players):
            self.update_player_movement(index, player)

        self.check_winner()
        # 프론트엔드에 필요한 정보 보내기
        return {
            "winner": self.winner,
            "ball": self.ball.to_dict(),
            "players": [player.to_dict() for player in self.players]
        }

