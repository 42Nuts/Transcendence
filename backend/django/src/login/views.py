from django.http import JsonResponse, HttpResponseRedirect
from users.models import User
import requests
import logging

logger = logging.getLogger('django')


def login(request):
    if request.method != 'GET':
        return JsonResponse({'status': 403})

    authorization_code = request.GET.get('code')  # 1. resource owwner 승인
    logger.info("authorization_code = " + authorization_code)
    if authorization_code is None:
        return JsonResponse({'status': 404})

    url = (
        f'https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_secret=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&client_id=u-s4t2ud-d10a9ce21bddf5c5122891fa28175e899c5994149a2c95ab9178de72cb1eb491&redirect_uri=https%3A%2F%2F127.0.0.1%2Fauth&response_type=code&code={authorization_code}')
    # 2. access_token 발급 api 호출
    logger.info('url: ' + url)
    response = requests.post(url)
    if response.status_code == 200:
        data = response.json()
        access_token = data['access_token']
        logger.info('access_token', access_token)
        refresh_token = data['refresh_token']

        # 3. user 정보 api 호출
        url = f'https://api.intra.42.fr/v2/me?access_token={ access_token }'
        logger.info('user api 호출: ' + url)
        response = requests.get(url)
        data = response.json()
        email = data['email']
        logger.info('email: ' + email)

        # email을 통해 유저 조회 또는 생성
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        )
        # 생성된 경우와 기존 유저의 경우 확인
        if (created):
            logger.info(f"새로운 유저 생성 = {email}")
            logger.info('JsonResponse = ' + str(JsonResponse({'user_id': user.id})))
        else:
            logger.info(f"기존유저 token 업데이트= {email}")
            user.access_token = access_token
            user.refresh_token = refresh_token
            user.save()

        # python 내장함수 vars()로 객체의 __dict__  속성을 반환해서 key, value 출력해보기
        logger.info('유저 객체의 모든 속성과 값 출력')
        for key, value in vars(user).items():
            logger.info(f"{key}: {value}")
    else:
        logger.error('error 입니다!')
        return JsonResponse({'status': 500})

    return JsonResponse({'user_id': user.id})


def home(request):
    pass
