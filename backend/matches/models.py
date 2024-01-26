from django.contrib.postgres.fields import ArrayField
from django.db import models

class Player(models.Model):
	as_user = models.ForeignKey(
		"user.User",
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
	paddle_mid = ArrayField()
	paddle_line = ArrayField()
	paddle_length = models.IntegerField()

class Match(models.Model):
	start_time = models.DateTimeField()
	mode = models.CharField()
	round_number = models.IntegerField()
	ball_position = ArrayField()
	ball_speed = models.IntegerField()
	ball_direction = ArrayField()
	ball_radius = models.IntegerField() 

