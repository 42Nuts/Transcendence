from django.shortcuts import render
from users.models import User
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, HttpResponseNotAllowed, Http404
import json
import logging

logger = logging.getLogger('django')


def dark_mode_handler(request, user_id):
    if request.method == 'GET':
        logger.info("GET: %s", str(request.method))
        try:
            user = User.objects.get(pk=user_id)
            logger.info("GET: %s", str(user))
        except User.DoesNotExist:
            raise Http404()
        return JsonResponse({'dark_mode': user.dark_mode})
    elif request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        dark_mode = data.get('dark_mode')
        logger.info("PUT: %s", str(request.method))
        logger.info("PUT: %s", str(dark_mode))
        if dark_mode is None:
            return HttpResponse(status=422)
        request.user.dark_mode = dark_mode
        request.user.save()
        return HttpResponse(request.user.dark_mode)

    return HttpResponseNotAllowed(['GET', 'PUT'])
 

def theme_handler(request, user_id):
    if request.method == 'GET':
        logger.info("GET: %s", str(request.method))
        try:
            user = User.objects.get(pk=user_id)
            logger.info("GET: %s", str(user))
        except User.DoesNotExist:
            raise Http404()
        return JsonResponse({'theme_index': user.theme_index})
    elif request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        theme_index = data.get('theme_index')
        logger.info("PUT: %s", str(request.method))
        logger.info("PUT: %s", str(theme_index))
        if theme_index is None:
            return HttpResponse(status=422)
        request.user.theme_index = theme_index
        request.user.save()
        return JsonResponse({'theme_index': request.user.theme_index})

    return HttpResponseNotAllowed(['GET', 'PUT'])


def nickname_handler(request, user_id):
    if request.method == 'GET':
        logger.info("GET: %s", str(request.method))
        try:
            user = User.objects.get(pk=user_id)
            logger.info("GET: %s", str(user))
        except User.DoesNotExist:
            raise Http404()
        return JsonResponse({'nickname': user.nickname})
    elif request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        nickname = data.get('nickname')
        logger.info("PUT: %s", str(request.method))
        logger.info("PUT: %s", str(nickname))
        if nickname is None:
            return HttpResponse(status=422)
        request.user.nickname = nickname
        request.user.save()
        return JsonResponse({'nickname': request.user.nickname})

    return HttpResponseNotAllowed(['GET', 'PUT'])


def profile_url_handler(request, user_id):
    if request.method == 'GET':
        logger.info("GET: %s", str(request.method))
        try:
            user = User.objects.get(pk=user_id)
            logger.info("GET: %s", str(user))
        except User.DoesNotExist:
            raise Http404()
        return JsonResponse({'profile_index': user.profile_index})
    elif request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))
        profile_index = data.get('profile_index')
        logger.info("PUT: %s", str(request.method))
        logger.info("PUT: %s", str(profile_index))
        if profile_index is None:
            return HttpResponse(status=422)
        request.user.profile_index = profile_index
        request.user.save()
        return JsonResponse({'profile_index': request.user.profile_index})

    return HttpResponseNotAllowed(['GET', 'PUT'])


def account_handler(request, user_id):
    if request.method == 'DELETE':
        request.user.delete()
        return HttpResponseRedirect('/')
    elif request.method == 'POST':
        response = HttpResponseRedirect('/')
        response.set_cookie('access_token', '', max_age=0)
        response.set_cookie('refresh_token', '', max_age=0)
        return response
    return HttpResponseNotAllowed(['POST, DELETE'])


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


def followings_count_handler(request, user_id):
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
