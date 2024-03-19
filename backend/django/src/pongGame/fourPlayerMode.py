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
    def __init__(self, x, y, width, height, score, color, leftArrow, rightArrow, id, angle):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.score = score
        self.color = color
        self.leftArrow = leftArrow  
        self.rightArrow = rightArrow
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

class fourPlayer:
    def __init__(self, player_ids):
        self.canvas = GameCanvas(width=700, height=700, paddle_length=100)
        self.players = []
        self.last_touch_player = None
        self.reset_angle = 0

        self.players.append(Paddle(
            x=(self.canvas.width - self.canvas.paddle_length) / 2,
            y=self.canvas.height - 20,
            width=100,
            height=10,
            score=0,
            color="white",
            leftArrow=False,
            rightArrow=False,
            id=player_ids[0],
            angle=0
        ))

        self.players.append(Paddle(
            x= 10,
            y= self.canvas.height / 2 - self.canvas.paddle_length / 2,
            width=10,
            height=100,
            score=0,
            color="WHITE",
            leftArrow=False,
            rightArrow=False,
            id=player_ids[1],
            angle=90
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
            id=player_ids[2],
            angle=180
        ))

        self.players.append(Paddle(
            x= self.canvas.width - 20,
            y= self.canvas.height / 2 - self.canvas.paddle_length / 2,
            width=10,
            height=100,
            score=0,
            color="WHITE",
            leftArrow=False,
            rightArrow=False,
            id=player_ids[3],
            angle=270
        ))

        self.player_map = {player.id: player for player in self.players}

        self.ball = GameBall(
            x=self.canvas.width / 2,
            y=self.canvas.height / 2,
            radius=10,
            velocity_x=7,
            velocity_y=1,
            speed=7,
            color="WHITE"
        )

    def reset_ball(self):
        self.reset_angle += 90
        if self.reset_angle == 360:
            self.reset_angle = 0

        self.ball.x = self.canvas.width / 2
        self.ball.y = self.canvas.height / 2
        self.ball.speed = 5
        self.last_touch_player = None

        angle_radians = math.radians(self.reset_angle)
        self.ball.velocity_x = self.ball.speed * math.cos(angle_radians) + 1
        self.ball.velocity_y = self.ball.speed * math.sin(angle_radians) + 1

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
    
    def find_closest_paddle(self):
        min_distance = float('inf')  # 최소 거리 초기화
        closest_paddle = None  # 가장 가까운 패들 초기화
        closest_index = None

        for index, paddle in enumerate(self.players):
            # 공과 패들 중심 사이의 거리 계산
            distance = math.sqrt((paddle.x - self.ball.x) ** 2 + (paddle.y - self.ball.y) ** 2)
            
            if distance < min_distance:
                min_distance = distance
                closest_paddle = paddle
                closest_index = index

        return closest_index, closest_paddle
    
    def update_player_movement(self, index, player):
        angle_radians = math.radians(180 - player.angle)
        move_distance = 8  # 움직임의 기본 단위
        # index 0: 바닥 변을 따라 움직임
        if index == 0:
            if player.leftArrow and player.x > 0:
                player.x -= move_distance
            if player.rightArrow and player.x < self.canvas.width - player.width:
                player.x += move_distance
        # index 1: 왼쪽 변을 따라 움직임
        elif index == 1:
            if player.leftArrow and player.y - player.width / 2 + 5 > 0:
                player.y -= move_distance 
            if player.rightArrow and player.y + player.width / 2  < self.canvas.height:
                player.y += move_distance 
        # index 2: 오른쪽 변을 따라 움직임
        elif index == 2:
            if player.leftArrow and player.x < self.canvas.width - player.width:
                player.x += move_distance 
            if player.rightArrow and player.x > 0:
                player.x -= move_distance
        elif index == 3:
            if player.rightArrow and player.y - player.width / 2 + 5 > 0:
                player.y -= move_distance 
            if player.leftArrow and player.y + player.width / 2  < self.canvas.height:
                player.y += move_distance

    def update_score(self, ball):
        canvas_width, canvas_height = self.canvas.width, self.canvas.height
        radius = ball.radius

        if ball.x - radius < 0 or ball.x + radius > canvas_width or ball.y - radius < 0 or ball.y + radius > canvas_height:
            if self.last_touch_player:
                self.player_map[self.last_touch_player].score += 1  # 점수 업데이트
            else:
                if ball.x - radius < 0:
                    self.players[0].score += 1
                    self.players[2].score += 1
                    self.players[3].score += 1
                elif ball.x + radius > canvas_width:
                    self.players[0].score += 1
                    self.players[1].score += 1
                    self.players[2].score += 1
                elif ball.y - radius < 0:
                    self.players[0].score += 1
                    self.players[1].score += 1
                    self.players[3].score += 1
                elif ball.y + radius > canvas_height:
                    self.players[1].score += 1
                    self.players[2].score += 1
                    self.players[3].score += 1
            self.reset_ball()

    def check_winner(self):
        for player in self.players:
            if player.score >= 5:
                self.winner = player.id
                return True
        return False

    def update(self, user_input=None):
        # score
        self.update_score(self.ball)
        
        # 공의 위치 변경
        self.ball.x += self.ball.velocity_x
        self.ball.y += self.ball.velocity_y

        # 공의 위치에 따른 플레이어 확인 (야매로  함,  확인  필요!)
        index, player = self.find_closest_paddle()

        # 플레이어가 누군지에 따라 공이 중앙에 가까울 수록 0도, 끝에 가까울 수록 45도로 튕기게 설정
        if self.collision(self.ball, player):
            if index % 2:
                collidePoint = (self.ball.y - (player.y + player.height / 2))
                collidePoint /= (player.height / 2)
                direction = 1 if self.ball.x + self.ball.radius < self.canvas.width / 2 else -1
                angleRad = (math.pi / 4) * collidePoint

                self.ball.velocity_x = direction * self.ball.speed * math.cos(angleRad)
                self.ball.velocity_y = self.ball.speed * math.sin(angleRad)
            else:
                collidePoint = (self.ball.x - (player.x + player.width / 2))
                collidePoint /= (player.width / 2)
                direction = 1 if self.ball.y + self.ball.radius < self.canvas.height / 2 else -1
                angleRad = (math.pi / 4) * collidePoint

                self.ball.velocity_x = self.ball.speed * math.sin(angleRad)
                self.ball.velocity_y = direction * self.ball.speed * math.cos(angleRad)

            # 게임 중 스피드가 점차 증가
            self.ball.speed += 0.1
            self.last_touch_player = player.id

    # 키보드 입력에 따른 변수 변화
        if user_input:
            player_id = user_input.get("playerId")
            player = self.player_map.get(player_id)

            if player:
                player.leftArrow = user_input.get("leftArrow", False)
                player.rightArrow = user_input.get("rightArrow", False)

        # 플레이어 움직임 기록
        for index, player in enumerate(self.players):
            self.update_player_movement(index, player)

        self.check_winner()
        # 프론트엔드에 필요한 정보 보내기
        return {
            "winner": self.winner,
            "ball": self.ball.to_dict(),
            "players": [player.to_dict() for player in self.players]
        }

