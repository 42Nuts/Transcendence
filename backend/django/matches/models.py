from django.db import models
from django.contrib.postgres.fields import ArrayField


class Player(models.Model):
	as_user = models.ForeignKey(
		"users.User",
		related_name="as_players",
		on_delete=models.CASCADE
	)
	match = models.ForeignKey(
		"matches.Match",
		related_name="players",
		on_delete=models.CASCADE
	)
	score = models.IntegerField(default=0)
	is_winner = models.BooleanField(default=False)
	left_arrow = models.BooleanField(default=False)
	right_arrow = models.BooleanField(default=False)
	# TODO: PostgreSQL 연결해서 실행
	# paddle_mid = ArrayField(models.DecimalField(
	# 	max_digits=24, decimal_places=8), size=2)
	# paddle_line = ArrayField(models.DecimalField(
	# 	max_digits=24, decimal_places=8), size=2)
	# paddle_length = models.IntegerField()


class Match(models.Model):
	start_time = models.DateTimeField(auto_now_add=True)
	mode = models.CharField(max_length=10)
	round_number = models.IntegerField(default=1)
	ball_speed = models.IntegerField()
	ball_radius = models.IntegerField()
	# TODO: PostgreSQL 연결해서 실행
	# ball_position = ArrayField(models.DecimalField(
	# 	max_digits=24, decimal_places=8), size=2)
	# ball_direction = ArrayField(models.DecimalField(
	# 	max_digits=24, decimal_places=8), size=2)
