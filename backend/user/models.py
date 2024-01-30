from django.db import models
from config.settings import DEFAULT_GAME_SKIN_IMAGE_URL, DEFAULT_TIER_IMAGE_URL, DEFAULT_PROFILE_IMAGE_URL


class User(models.Model):
    email = models.EmailField(unique=True)
    access_token = models.TextField(blank=False)
    refresh_token = models.TextField(blank=False)
    user_state = models.BooleanField(default=True)
    nickname = models.CharField(max_length=10)
    profile_image_url = models.ImageField(
        upload_to='profile/', default=DEFAULT_PROFILE_IMAGE_URL)
    background_color = models.CharField(max_length=20, default='black')
    tier = models.IntegerField(default=0)
    tier_image_url = models.CharField(
        max_length=255, default=DEFAULT_TIER_IMAGE_URL)
    wins = models.IntegerField(default=0)
    loses = models.IntegerField(default=0)
    dark_mode = models.BooleanField(default=False)
    game_skin_image_url = models.CharField(
        max_length=255, default=DEFAULT_GAME_SKIN_IMAGE_URL)
    follower_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    following = models.ManyToManyField(
        "self",
        verbose_name="팔로우 중인 사용자들",
        related_name="followers",  # 역방향 user1.following / user2.followers
        symmetrical=False,
        through="relationships.Relationship"
    )
