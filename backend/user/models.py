from django.db import models

class User(models.Model):
    email = models.EmailField()
    access_token = models.TextField()
    refresh_token = models.TextField()
    user_state = models.BooleanField(default=True)
    nickname = models.CharField(max_length=10)
    profile_image_url = models.ImageField(
        upload_to='images path', default='default image path')
    background_color = models.CharField(max_length=20)
    tier = models.IntegerField(default=0)
    tier_image_url = models.ImageField(
        upload_to='images path', default='default image path')
    wins = models.IntegerField(default=0)
    loses = models.IntegerField(default=0)
    dark_mode = models.BooleanField(default=False)
    game_skin_image_url = models.ImageField(
        upload_to='images path', default='default image path')
    follower_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    following = models.ManyToManyField(
        "self",
        verbose_name="팔로우 중인 사용자들",
        related_name="followers", # 역방향 user1.following / user2.followers
        symmetrical=False,
        through="relationships.Relationship",
    )
