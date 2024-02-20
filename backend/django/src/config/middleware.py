import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import HttpResponse, Http404, HttpResponseForbidden
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

# authenitcate() verifies and decode the token
# if token is invalid, it raises an exception and returns 401
logger = logging.getLogger('django')
JWT_authenticator = JWTAuthentication()


def simple_middleware(get_response):
    def middleware(request):
        logger.info("Request Path: %s", str(request.path))
        logger.info("Request Method: %s", str(request.method))
        logger.info("Request GET: %s", str(request.GET))
        logger.info("Request Headers: %s", str(request.headers))

        if request.path == '/42oauth/':  # 인증
            response = get_response(request)
            return response
        else:  # 애플리케이션 사용 (무조건 토큰이 있어야 함)
            try:
                # 토큰 검사 (토큰 재발급 로직 필요)
                token = request.COOKIES.get('access_token')
                if token is None:
                    raise AuthenticationFailed()
                logger.info(f'access_token : {str(token)}')

                validated_token = JWT_authenticator.get_validated_token(token)

                user = JWT_authenticator.get_user(validated_token)
                # API 유효성 검사
                splitedUrl = list(request.path.strip('/').split('/'))
                logger.info(f'len : {len(splitedUrl)}')
                if splitedUrl[0] == 'v2':
                    if len(splitedUrl) < 3:
                        return HttpResponse('Not API URI', status=404)

                    logger.info("user pk: %s", str(user.pk))
                    logger.info("splitedUrl0: %s", str(splitedUrl[1]))
                    logger.info("splitedUrl1: %s", str(splitedUrl[2]))
                    if (request.method in ['PUT', 'DELETE']) and splitedUrl[1] == 'users' and user.pk != int(splitedUrl[2]):
                        return HttpResponseForbidden()

                logger.info('after checck')
                request.user = user
                logger.info("User: %s", str(user))
                logger.info('미들웨어 통과: 인증 성공')
                response = get_response(request)
                return response
            # (토큰 검증 성공 후의 로직)
            except AuthenticationFailed as e:
                logger.info("Authentication failed: %s", str(e))
                return HttpResponse('Authentication failed', status=401)
            except InvalidToken as e:
                logger.info("Invalid token: %s", str(e))
                return HttpResponse('Invalid token', status=401)
            except Exception as e:
                logger.info("Unexpected error: %s", str(e))
                return HttpResponse('Unexpected error', status=500)

    return middleware