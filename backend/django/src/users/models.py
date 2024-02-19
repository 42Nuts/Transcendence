from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from config.settings import DEFAULT_GAME_SKIN_IMAGE_URL, DEFAULT_TIER_IMAGE_URL, DEFAULT_PROFILE_IMAGE_URL

# 커스텀 유저 모델을 생성하고 관리하는 클래스


class CustomUserManager(BaseUserManager):
    # 일반 사용자 생성 함수
    def create_user(self, email, password=None, **extra_fields):
        """
        일반 사용자를 생성하는 메서드
        이메일은 필수 입력 필드, 비밀번호는 선택
        **extra_fields를 통해 추가적인 필드 값을 받을 수 있다.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 슈퍼유저 생성 함수
    def create_superuser(self, email, password=None, **extra_fields):
        """
        슈퍼유저를 생성하는 메서드
        슈퍼유저는 모든 권한을 가진 사용자로, 관리자 페이지에 접근할 수 있다.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

# 커스텀 유저 모델 클래스


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    user_state = models.BooleanField(
        default=True, help_text='Designates whether this user should be treated as active.')
    nickname = models.CharField(
        max_length=10, help_text='Unique nickname for the user.')
    profile_image_url = models.ImageField(
        upload_to='profile/', default=DEFAULT_PROFILE_IMAGE_URL, help_text='URL for the user\'s profile image.')
    background_color = models.CharField(
        max_length=20, default='black', help_text='Background color for the user profile.')
    tier = models.IntegerField(
        default=0, help_text='User tier, representing their level or rank.')
    tier_image_url = models.CharField( 
        max_length=255, default=DEFAULT_TIER_IMAGE_URL, help_text='URL for the user\'s tier image.')
    wins = models.IntegerField(
        default=0, help_text='Number of wins the user has achieved.')
    loses = models.IntegerField(
        default=0, help_text='Number of losses the user has incurred.')
    dark_mode = models.BooleanField(
        default=False, help_text='Whether the user prefers dark mode.')
    game_skin_image_url = models.CharField(
        max_length=255, default=DEFAULT_GAME_SKIN_IMAGE_URL, help_text='URL for the user\'s game skin image.')
    follower_count = models.IntegerField(
        default=0, help_text='Number of followers the user has.')
    following_count = models.IntegerField(
        default=0, help_text='Number of users the user is following.')

    # 사용자를 식별할 때 사용할 필드를 'email'로 설정
    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['nickname']

    # CustomUserManager 인스턴스를 사용하여 유저 생성 및 관리
    objects = CustomUserManager()

    def get_email(self):
        # 사용자의 이메일을 반환.
        return self.email

    def get_short_name(self):
        # 사용자의 닉네임 반환
        return self.nickname
