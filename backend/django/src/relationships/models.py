from django.db import models
from users.models import User

class Relationship(models.Model):
    from_user = models.ForeignKey(
        User,
        verbose_name="팔로우를 요청한 사용자",
        related_name="following_relationships",  # 역방향
        on_delete=models.CASCADE,  # 참조하는 유저 객체가 삭제될 때 이 객체도 함께 삭제
    )
    to_user = models.ForeignKey(
        User,
        verbose_name="팔로우 요청의 대상",
        related_name="follower_relationships",  # 역방향
        on_delete=models.CASCADE,  # 참조하는 유저 객체가 삭제될 때 이 객체도 함께 삭제
    )
