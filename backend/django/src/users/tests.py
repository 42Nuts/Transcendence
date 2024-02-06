from django.test import TestCase
from .models import User
from config.settings import DEFAULT_GAME_SKIN_IMAGE_URL, DEFAULT_TIER_IMAGE_URL, DEFAULT_GAME_SKIN_IMAGE_URL
from django.db.utils import IntegrityError


class UserModelTests(TestCase):

    def test_created(self):
        User.objects.create(
            email="test@example.com",
            access_token="someaccesstoken",
            refresh_token="somerefreshtoken",
            user_state=True,
            nickname="test",
            profile_image_url=DEFAULT_GAME_SKIN_IMAGE_URL,
            background_color="test",
            tier=1,  # 예시 값
            tier_image_url=DEFAULT_TIER_IMAGE_URL,
            wins=0,  # 예시 값
            loses=1,  # 예시 값
            dark_mode=False,
            game_skin_image_url=DEFAULT_GAME_SKIN_IMAGE_URL,
            follower_count=0,
            following_count=0
        ).save()
        for user in User.objects.all():
            print('-----------------------------------------')
            for attribute, value in vars(user).items():
                print(f'{attribute} : {value}')
            print('-----------------------------------------')

    def test_unique_email(self):  # 이메일이 유니크한지 확인
        # 첫 번째 사용자 생성
        User.objects.create(
            email="taeypark@example.com",
            access_token="someaccesstoken",
            refresh_token="somerefreshtoken",
            user_state=True,
            nickname="Taeypark",
            profile_image_url=DEFAULT_GAME_SKIN_IMAGE_URL,
            background_color="Pink",
            tier=1,  # 예시 값
            tier_image_url=DEFAULT_TIER_IMAGE_URL,
            wins=0,  # 예시 값
            loses=1,  # 예시 값
            dark_mode=False,
            game_skin_image_url=DEFAULT_GAME_SKIN_IMAGE_URL,
            follower_count=0,
            following_count=0
        ).save()

        # 다른 이메일로 두 번째 사용자 생성 시도
        try:
            User.objects.create(
                email="taeyparka@example.com",
                user_state=True,
                access_token="someaccesstoken",
                refresh_token="somerefreshtoken",
                nickname="hyeoan",
                profile_image_url=DEFAULT_GAME_SKIN_IMAGE_URL,
                background_color="Pink",
                tier=1,  # 예시 값
                tier_image_url=DEFAULT_TIER_IMAGE_URL,
                wins=1,  # 예시 값
                loses=0,  # 예시 값
                dark_mode=False,
                game_skin_image_url=DEFAULT_GAME_SKIN_IMAGE_URL,
                follower_count=0,
                following_count=0
            ).save()
        except IntegrityError:
            self.assertIs(True, False)
