from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from users.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import requests
import logging

logger = logging.getLogger('django')

# 주어진 사용자에 대해 JWT 토큰(액세스 및 리프레시 토큰)을 생성하는 함수.


def get_tokens_for_user(user):
    # 주어진 사용자에 대한 리프레시 토큰을 생성
    refresh = RefreshToken.for_user(user)
    return {
        # 생성된 리프레시 토큰과 액세스 토큰을 문자열로 변환하여 딕셔너리 형태로 반환.
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }


def login(request):
    if request.method != 'GET':
        return JsonResponse({'status': 403})

    authorization_code = request.GET.get('code')
    if not authorization_code:
        return JsonResponse({'status': 404})

    try:
        # 액세스 토큰 및 리프레시 토큰을 요청하는 URL
        token_url = 'https://api.intra.42.fr/oauth/token'
        # 인증 코드를 이용해 액세스 토큰 요청 시 사용할 payload
        payload = {
            'grant_type': 'authorization_code',
            'client_id': 'u-s4t2ud-9380be22ecb707d53962442bf1a1cc52f6babd5997fd64d097888e300dd8f44f',
            'client_secret': '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',
            'redirect_uri': 'https://127.0.0.1/auth/',
            'code': authorization_code,
        }
        # 액세스 토큰 요청
        token_response = requests.post(token_url, data=payload)
        # HTTP 요청 실패 시 예외 발생
        token_response.raise_for_status()
        # 액세스 토큰과 리프레시 토큰을 추출
        access_token = token_response.json().get('access_token')
        refresh_token = token_response.json().get('refresh_token')
        logger.info('Access token: %s', access_token)
        logger.info('Refresh token: %s', refresh_token)

        # 사용자 정보를 요청하는 URL
        user_info_url = 'https://api.intra.42.fr/v2/me'
        headers = {'Authorization': f'Bearer {access_token}'}
        user_response = requests.get(user_info_url, headers=headers)
        # HTTP 요청 실패 시 예외 발생
        user_response.raise_for_status()

        # 이메일을 기반으로 사용자 조회 또는 생성
        email = user_response.json().get('email')
        logger.info('email: %s', email)
        user, created = User.objects.get_or_create(email=email)

        # 사용자에게 JWT 토큰(access token 및 refresh token) 발급
        tokens = get_tokens_for_user(user)

        response = HttpResponseRedirect('/home')
        response.set_cookie(key='access_token',
                            value=tokens['access'], httponly=True, secure=True)
        response.set_cookie(key='refresh_token',
                            value=tokens['refresh'], httponly=True, secure=True)
        return response

    except requests.RequestException as err:
        logger.error("외부 API 호출 에러: %s", str(err))
        return JsonResponse({'status': 500, 'error': 'External API call error'})
    # except Exception as err:
    #     logger.error("그 외 서버 내부 에러: %s", str(err))
    #     return JsonResponse({'status': 500, 'error': 'Server internal error'})


def home(request):
    # require_nickname = user.nickname is None
    # logger.info('require_nickname: %s', require_nickname)
    return HttpResponse('minsulee is here')

