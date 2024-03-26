import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import HttpResponse, Http404, HttpResponseForbidden, HttpResponseRedirect
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed


# authenitcate() verifies and decode the token
# if token is invalid, it raises an exception and returns 401
logger = logging.getLogger('django')
JWT_authenticator = JWTAuthentication()


def get_user(access_token):
    if access_token is None:
        raise AuthenticationFailed()
    logger.info(f'access_token : {str(access_token)}')

    validated_token = JWT_authenticator.get_validated_token(access_token)
    user = JWT_authenticator.get_user(validated_token)
    return user


def log_detail(request):
    logger.info("Request Path: %s", str(request.path))
    logger.info("Request Method: %s", str(request.method))
    logger.info("Request GET: %s", str(request.GET))
    logger.info("Request Headers: %s", str(request.headers))


def is_authorized_path(user, request):
    splitedUrl = list(request.path.strip('/').split('/'))

    if splitedUrl[0] == 'v2' and len(splitedUrl) >= 3:
        logger.info("user pk: %s", str(user.pk))
        logger.info("splitedUrl0: %s", str(splitedUrl[1]))
        logger.info("splitedUrl1: %s", str(splitedUrl[2]))
        if (request.method in ('PUT', 'DELETE')) and splitedUrl[1] == 'users' and user.pk != int(splitedUrl[2]):
            return False
    return True


def tokenCheck(get_response):
    def middleware(request):
        log_detail(request)

        if request.path in ('/health/', '/prometheus/metrics'):
            return get_response(request)

        try:
            # 토큰 검사 (토큰 재발급 로직 필요)
            user = get_user(request.COOKIES.get('access_token'))
            if not is_authorized_path(user, request):
                logger.inof('접근 권한 없음')
                return HttpResponseForbidden()

            logger.info('미들웨어 통과: 인증 성공')

            if request.path in ('/', '/42oauth/'):
                return HttpResponseRedirect('/home/')

            request.user = user
            return get_response(request)
        # (토큰 검증 성공 후의 로직)
        except (AuthenticationFailed, InvalidToken) as e:
            if request.path in ('/', '/42oauth/'):  # 인증
                return get_response(request)
            return HttpResponse(str(e), status=401)
        except Exception as e:
            logger.info("Unexpected error: %s", str(e))
            return HttpResponse('Unexpected error', status=500)

    return middleware
