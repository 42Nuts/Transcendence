from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from users.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import render
import requests
import logging
import os

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

# OAuth 서버에서 엑세스 토큰 및 리프레시 토큰을 요청하는 함수
def request_oauth_token(authorization_code):
    # 엑세스 토큰 및 리프레시 토큰을 요청하는 URI
    token_url = os.environ.get('FOURTYTWO_TOKEN_URI')
    # 인증 코드를 이용해 엑세스 토큰 요청 시 사용할 payload
    payload = {
        'grant_type': os.environ.get('FOURTYTWO_GRANT_TYPE'),
        'client_id': os.environ.get('FOURTYTWO_CLIENT_ID'),
        'client_secret': os.environ.get('FOURTYTWO_CLIENT_SECRET'),
        'redirect_uri': os.environ.get('FOURTYTWO_REDIRECT_URI'),
        'code': authorization_code,
    }
    # 엑세스 토큰 요청
    token_response = requests.post(token_url, data=payload)
    # HTTP 요청 실패 시 예외 발상
    token_response.raise_for_status()
    return token_response.json()

# 엑세스 토큰을 사용하여 사용자 정보를 요청하는 함수
def request_user_info(access_token):
    # 사용자 정보를 요청하는 URL
    user_info_url = os.environ.get('FOURTYTWO_USER_API')
    # 인증 헤더 설정
    headers = {'Authorization': f'Bearer {access_token}'}
    # 사용자 정보 요청
    user_response = requests.get(user_info_url, headers=headers)
    # HTTP 요청 실패 시 예외 발생
    user_response.raise_for_status()
    return user_response.json()
def fourtytwo_oauth(request):
    if request.method != 'GET':
        return JsonResponse({'status': 403})

    authorization_code = request.GET.get('code')
    if not authorization_code:
        return HttpResponseRedirect('/')

    try:
        # OAuth 토큰 요청
        tokens = request_oauth_token(authorization_code)
        access_token = tokens.get('access_token')
        refresh_token = tokens.get('refresh_token')
        logger.info('Access token: %s', access_token)
        logger.info('Refresh token: %s', refresh_token)

        # 사용자 정보 요청
        user_info = request_user_info(access_token)
        email = user_info.get('email')
        logger.info('email: %s', email)
        user = get_or_create_user_by_email(email)

        # 사용자에게 JWT 토큰(access token 및 refresh token) 발급
        jwt_tokens = get_tokens_for_user(user)
        response = HttpResponseRedirect('/home/')
        response.set_cookie(key='access_token',
                            value=jwt_tokens['access'], httponly=True, secure=True)
        response.set_cookie(key='refresh_token',
                            value=jwt_tokens['refresh'], httponly=True, secure=True)
        return response

    except requests.RequestException as err:
        logger.error("외부 API 호출 에러: %s", str(err))
        return JsonResponse({'status': 500, 'error': 'External API call error'})
    except Exception as err:
        logger.error("그 외 서버 내부 에러: %s", str(err))
        return JsonResponse({'status': 500, 'error': 'Server internal error'})

# 로그인 페이지 렌더링
def loginPage(request):
    context = {
        'isHomePage': False,
    }
    return render(request, 'index.html', context)


# 홈페이지 렌더링
def home(request):
    context = {
        'requireNickName': (request.user.nickname == ''),
        'isHomePage': True,
        'userId': request.user.pk,
    }
    return render(request, 'index.html', context)
