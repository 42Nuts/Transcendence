from django.shortcuts import render
from users.models import User
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import get_object_or_404


def dark_mode_handler(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    return HttpResponse(user.dark_mode)


def theme_handler(request, user_id):
    pass


def nickname_handler(request, user_id):
    pass


def profile_url_handler(request, user_id):
    pass


def background_color_handler(request, user_id):
    pass


def tier_url_handler(request, user_id):
    pass


def tier_handler(request, user_id):
    pass


def wins_handler(request, user_id):
    pass


def loses_handler(request, user_id):
    pass


def followers_count_handler(request, user_id):
    pass


def followings_counnt_handler(request, user_id):
    pass


def account_handler(request, user_id):
    pass


'''
유저 오브젝트 개수 확인
python3 manage.py shell
from user.models import User
all_users = User.objects.all()
for user in all_users:
    print(user)

유저 오브젝트 삭제
from user.models import User
User.objects.all().delete()

42intra에서 유저가 api를 삭제하고  다시 접속해도 기존 유저로 접속된다
'''
