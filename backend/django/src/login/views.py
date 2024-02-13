from django.http import JsonResponse, HttpResponseRedirect
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
            'client_id': 'u-s4t2ud-d10a9ce21bddf5c5122891fa28175e899c5994149a2c95ab9178de72cb1eb491',
            'client_secret': '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',
            'redirect_uri': 'https://127.0.0.1:5000/auth/',
            'code': authorization_code,
        }
        # 액세스 토큰 요청
        token_response = requests.post(token_url, data=payload)
        # HTTP 요청 실패 시 예외 발생
        token_response.raise_for_status()
        # 액세스 토큰과 리프레시 토큰을 추출
        access_token = token_response.json().get('access_token')
        refresh_token = token_response.json().get('refresh_token')
        logger.info('access_token', access_token)
        logger.info('refresh_token', refresh_token)

        # 사용자 정보를 요청하는 URL
        user_info_url = 'https://api.intra.42.fr/v2/me'
        headers = {'Authorization': f'Bearer {access_token}'}
        user_response = requests.get(user_info_url, headers=headers)
        # HTTP 요청 실패 시 예외 발생
        user_response.raise_for_status()
        email = user_response.json().get('email')
        logger.info('email', email)

        # 이메일을 기반으로 사용자 조회 또는 생성
        user, created = User.objects.get_or_create(email=email)

        # 사용자에게 JWT 토큰(access token 및 refresh token) 발급
        tokens = get_tokens_for_user(user)
        return JsonResponse({'access': tokens['access'], 'refresh': tokens['refresh']})

    except requests.RequestException as err:
        logger.error(f"외부 API 호출 에러: {str(err)}")
        return JsonResponse({'status': 500, 'error': 'External API call error'})
    except Exception as err:
        logger.error(f"그 외 서버 내부 에러: {str(err)}")
        return JsonResponse({'status': 500, 'error': 'Server internal error'})

        # # User 객체 조회 또는 생성
        # user, created = User.objects.get_or_create(
        #     email=user_data,
        #     defaults={
        #         'access_token': access_token,
        #         'refresh_token': refresh_token
        #     }
        # )

        # if created:
        #     # 새로운 유저 생성 시
        #     logger.info(f"새로운 유저 생성 = {email}")
        #     logger.info('JsonResponse = ' +
        #                 str(JsonResponse({'user_id': user.id})))
        #     return JsonResponse({'new user_id': user.id})
        # else:
        #     # 기존 유저 로그인
        #     logger.info(f"기존 유저 로그인 = {email}")
        #     return JsonResponse({'Existing user_id': user.id})

    # except requests.RequestException as err:
    #     logger.error(f"외부 API 호출 에러: {str(err)}")
    #     return JsonResponse({'status': 500, 'error': 'External API call error'})
    # except Exception as err:
    #     logger.error(f"그 외 서버 내부 에러: {str(err)}")
    #     return JsonResponse({'status': 500, 'error': 'Server internal error'})


def home(request):
    pass
