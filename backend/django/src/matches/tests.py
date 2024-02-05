from django.test import TestCase
from .models import Match, Player
from users.models import User


class MatchTest(TestCase):

    def test_create_match(self):
        match = Match.objects.create(
            mode="2인 게임",
            ball_speed=4,
            ball_radius=4
        )

        self.assertEqual(match.mode, "2인 게임")
        self.assertEqual(match.ball_speed, 4)
        self.assertEqual(match.ball_radius, 4)

        for match in Match.objects.all():
            for attribute, value in vars(match).items():
                print(f'{attribute} : {value}')
