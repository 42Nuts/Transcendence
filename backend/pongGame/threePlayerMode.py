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
            "angle": self.angle
        }

class PongGame:
    def __init__(self):
        self.canvas = GameCanvas(width=600, height=500, paddle_length=100)
        self.players = []
        self.last_touch_player = None

        self.players.append(Paddle(
            x=(self.canvas.width - self.canvas.paddle_length) / 2,
            y=self.canvas.height - 20,
            width=100,
            height=10,
            score=0,
            color="white",
            leftArrow=False,
            rightArrow=False,
            id="player1",
            angle=0
        ))

        self.players.append(Paddle(
            x=self.canvas.width / 4 - self.canvas.paddle_length / 2,
            y=self.canvas.height / 2,
            width=100,
            height=10,
            score=0,
            color="WHITE",
            leftArrow=False,
            rightArrow=False,
            id="player2",
            angle=60
        ))

        self.players.append(Paddle(
            x=self.canvas.width / 4 * 3 - self.canvas.paddle_length / 2,
            y=self.canvas.height / 2,
            width=100,
            height=10,
            score=0,
            color="WHITE",
            leftArrow=False,
            rightArrow=False,
            id="player3",
            angle= -60
        ))

        self.player_map = {player.id: player for player in self.players}

        self.ball = GameBall(
            x=self.canvas.width / 2,
            y=self.canvas.height / 2,
            radius=10,
            velocity_x=3,
            velocity_y=3,
            speed=7,
            color="WHITE"
        )

    def resetBall(self):
        self.ball.x = self.canvas.width / 2
        self.ball.y = self.canvas.height / 2
        self.ball.velocity_x = -3 if self.ball.velocity_x > 0 else 3
        self.ball.velocity_y = -3 if self.ball.velocity_y > 0 else 3
        self.ball.speed = 7
    
    def rotate_point(self, cx, cy, angle, p):
        s = math.sin(math.radians(angle))
        c = math.cos(math.radians(angle))

        # 점을 원점으로 이동
        p[0] -= cx
        p[1] -= cy

        # 점 회전
        xnew = p[0] * c - p[1] * s
        ynew = p[0] * s + p[1] * c

        # 원래 위치로 점 이동
        p[0] = xnew + cx
        p[1] = ynew + cy
        return p

    def collision(self, ball, paddle):
        corners = [
            # 모서리 정의 생략...
        ]
        center_x = paddle.x + paddle.width / 2
        center_y = paddle.y + paddle.height / 2

        # self를 사용하여 rotate_point 메서드 호출
        rotated_corners = [self.rotate_point(center_x, center_y, paddle.angle, corner) for corner in corners]
        # 충돌 검사 로직...
        for corner in rotated_corners:
            if (corner[0] - ball.x) ** 2 + (corner[1] - ball.y) ** 2 <= ball.radius ** 2:
                return True  # 충돌 발생
        return False  # 충돌 없음
    
    def calculate_line_equation(self, point1, point2):
        (x1, y1), (x2, y2) = point1, point2
        if x2 - x1 == 0:  # 두 점의 x 좌표가 같을 경우, 기울기가 무한대이므로 수직선 처리
            return None, None  # 기울기와 y절편을 None으로 반환하여 수직선을 표시
        m = (y2 - y1) / (x2 - x1)
        b = y1 - m * x1
        return m, b
    
    def calculate_distance_to_line(self, point, line_equation):
        x0, y0 = point
        m, b = line_equation
        if m is None:  # 수직선의 경우, x0에서 선의 x좌표까지의 거리를 직접 계산
            return abs(x0 - b)  # 이 경우 b는 선의 x좌표
        return abs(m * x0 - y0 + b) / (m ** 2 + 1) ** 0.5
    
    def update_score(self, ball):
        canvas_width, canvas_height = self.canvas.width, self.canvas.height
        # 삼각형의 꼭지점 좌표
        point1 = (canvas_width / 2, 0)  # 중앙 상단
        point2 = (0, canvas_height)  # 좌측 하단
        point3 = (canvas_width, canvas_height)  # 우측 하단

        # # 각 변의 방정식 계산
        line1 = self.calculate_line_equation(point1, point2)
        line2 = self.calculate_line_equation(point2, point3)
        line3 = self.calculate_line_equation(point3, point1)

        # 공과 각 변 사이의 거리 계산
        distance1 = self.calculate_distance_to_line((ball.x, ball.y), line1)
        distance2 = self.calculate_distance_to_line((ball.x, ball.y), line2)
        distance3 = self.calculate_distance_to_line((ball.x, ball.y), line3)

        # 충돌 검사
        if distance1 <= ball.radius or distance2 <= ball.radius or distance3 <= ball.radius:
            if self.last_touch_player is not None:
                self.player_map[self.last_touch_player_id].score += 1  # 점수 업데이트
            self.resetBall()


    def update(self, user_input=None):
        # score
        self.update_score(self.ball)
        
        # 공의 위치 변경
        self.ball.x += self.ball.velocity_x
        self.ball.y += self.ball.velocity_y

        # computer ai
        # self.players[1].x += ((self.ball.x - (self.players[1].x + self.players[1].width / 2)) * 0.1)

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
            self.last_touch_player = player.id

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
