from django.test import TestCase
from .models import Relationship
from user.models import User


class RelationshipTest(TestCase):
    def test_follow(self):
        user1 = User.objects.create(email='hi@hyeoan.com')
        user2 = User.objects.create(email='yim@yim.com')

        Relationship.objects.create(from_user=user1, to_user=user2)
        self.assertIn(user2, user1.following.all())
        self.assertIn(user1, user2.followers.all())

        for rel in user1.following_relationships.all():
            print(f'{rel.from_user}, {rel.to_user}')

        for rel in user2.follower_relationships.all():
            print(f'{rel.from_user}, {rel.to_user}')
