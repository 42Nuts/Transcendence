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
        self.canvas = GameCanvas(width=600, height=(3 ** (1/2)) / 2 * 600, paddle_length=100)
        # self.canvas = GameCanvas(width=800, height=700, paddle_length=100)
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
            id="player1",
            angle=0
        ))

        self.players.append(Paddle(
            x=self.canvas.width / 4 - self.canvas.paddle_length / 2,
            y=self.canvas.width / 4 * (3 ** 0.5) + 20,
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
            y=self.canvas.width / 4 * (3 ** 0.5) + 20,
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
            x = self.canvas.width / 2,
            y = self.canvas.height - self.canvas.width / (2 * (3 ** 0.5)),
            radius = 10,
            velocity_x = 3 * math.cos(math.radians(self.reset_angle)),
            velocity_y = 3 * math.sin(math.radians(self.reset_angle)),
            speed = 3,
            color = "WHITE"
        )

    def reset_ball(self):
        self.reset_angle += 120
        if self.reset_angle == 360:
            self.reset_angle = 0

        self.ball.x = self.canvas.width / 2
        self.ball.y = self.canvas.height - self.canvas.width / (2 * (3 ** 0.5))
        self.ball.speed = 3
        self.last_touch_player = None

        angle_radians = math.radians(self.reset_angle)
        self.ball.velocity_x = self.ball.speed * math.cos(angle_radians)
        self.ball.velocity_y = self.ball.speed * math.sin(angle_radians)

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
        # 패들 모서리 정의
        corners = (
           [paddle.x, paddle.y],  # 왼쪽 상단
           [paddle.x + paddle.width, paddle.y],  # 오른쪽 상단
           [paddle.x, paddle.y + paddle.height],  # 왼쪽 하단
           [paddle.x + paddle.width, paddle.y + paddle.height],  # 오른쪽 하단
        )
        center_x = paddle.x + paddle.width / 2
        center_y = paddle.y + paddle.height / 2

        # 패들 모서리 회전
        rotated_corners = [self.rotate_point(center_x, center_y, paddle.angle * -1, corner) for corner in corners]

        # 충돌 검사
        line1 = self.calculate_line_equation(rotated_corners[0], rotated_corners[1])
        line2 = self.calculate_line_equation(rotated_corners[2], rotated_corners[3])
        distance1 = self.calculate_distance_to_line((ball.x, ball.y), line1)
        distance2 = self.calculate_distance_to_line((ball.x, ball.y), line2)

        # 새로운 직선 방정식 계산
        line3 = self.calculate_line_equation(rotated_corners[1], rotated_corners[3])
        line4 = self.calculate_line_equation(rotated_corners[0], rotated_corners[2])

        # 공이 직선 사이에 있는지 확인
        if line3[0] is not None and line4[0] is not None:  # 두 직선이 모두 수평이 아닌 경우
            y_on_line3 = line3[0] * ball.x + line3[1]
            y_on_line4 = line4[0] * ball.x + line4[1]
            between_lines = min(y_on_line3, y_on_line4) - ball.radius < ball.y < max(y_on_line3, y_on_line4) + ball.radius 
        elif line3[0] is None or line4[0] is None:  # line3 or line4가 수직선인 경우
            between_lines = rotated_corners[0][0] - ball.radius < ball.x < rotated_corners[1][0] + ball.radius
        else:  # 모든 다른 경우
            between_lines = False

        # 최종 충돌 판단
        if (distance1 <= ball.radius or distance2 <= ball.radius) and between_lines:
            return True
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
        return abs(m * x0 - y0 + b) / ((m ** 2 + 1) ** 0.5)
    
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
            if self.last_touch_player:
                self.player_map[self.last_touch_player].score += 1  # 점수 업데이트
            else:
                if distance1 <= ball.radius:
                    self.players[0].score += 1
                    self.players[2].score += 1
                elif distance2 <= ball.radius:
                    self.players[1].score += 1
                    self.players[2].score += 1
                elif distance3 <= ball.radius:
                    self.players[0].score += 1
                    self.players[1].score += 1
            self.reset_ball()
    
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
            if player.leftArrow and player.y + self.canvas.paddle_length * math.sin(player.angle) - 20 > 0:
                player.x -= move_distance * math.cos(angle_radians)
                player.y -= move_distance * math.sin(angle_radians)
            if player.rightArrow and player.y - self.canvas.paddle_length * math.sin(player.angle) + 20 < self.canvas.height:
                player.x += move_distance * math.cos(angle_radians)
                player.y += move_distance * math.sin(angle_radians)
        # index 2: 오른쪽 변을 따라 움직임
        elif index == 2:
            if player.leftArrow and player.y + self.canvas.paddle_length * math.sin(player.angle) + 20 < self.canvas.height:
                player.x -= move_distance * math.cos(angle_radians)
                player.y -= move_distance * math.sin(angle_radians)
            if player.rightArrow and player.y - 50> 0:
                player.x += move_distance * math.cos(angle_radians)
                player.y += move_distance * math.sin(angle_radians)

    def find_closest_paddle(self):
        min_distance = float('inf')  # 최소 거리 초기화
        closest_paddle = None  # 가장 가까운 패들 초기화

        for paddle in self.players:
            # 공과 패들 중심 사이의 거리 계산
            distance = math.sqrt((paddle.x - self.ball.x) ** 2 + (paddle.y - self.ball.y) ** 2)
            
            if distance < min_distance:
                min_distance = distance
                closest_paddle = paddle

        return closest_paddle

    def update(self, user_input=None):
        # score
        self.update_score(self.ball)
        
        # 공의 위치 변경
        self.ball.x += self.ball.velocity_x
        self.ball.y += self.ball.velocity_y

        # 공의 위치에 따른 플레이어 확인 (야매로  함,  확인  필요!)
        player = self.find_closest_paddle()

        # 플레이어가 누군지에 따라 공이 중앙에 가까울 수록 0도, 끝에 가까울 수록 45도로 튕기게 설정
        if self.collision(self.ball, player):
            paddle_center_x = player.x + player.width / 2
            paddle_center_y = player.y + player.height / 2
            rotated_paddle_x, rotated_paddle_y = self.rotate_point(paddle_center_x, paddle_center_y, player.angle, [self.ball.x, self.ball.y])
            collidePoint = (rotated_paddle_x - paddle_center_x) / (player.width / 2)

            angleRad = (math.pi / 4) * collidePoint + math.radians(player.angle)

            if player == self.players[0]:
                direction = -1
            else:
                direction = 1

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
            player.leftArrow = user_input.get("leftArrow", False)
            player.rightArrow = user_input.get("rightArrow", False)

        # 플레이어 움직임 기록
        for index, player in enumerate(self.players):
            self.update_player_movement(index, player)

        # 프론트엔드에 필요한 정보 보내기
        return {
            "ball": self.ball.to_dict(),
            "players": [player.to_dict() for player in self.players],
        }

