import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse, Http404
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

        if request.path == '/42oauth/':
            logger.info('before response')
            response = get_response(request)
            logger.info('after response')
            return response

        try:
            token = request.COOKIES.get('access_token')
            logger.info(f'cookie : {str(token)}')
            if token is None:
                raise AuthenticationFailed()

            validated_token = JWT_authenticator.get_validated_token(token)
            user = JWT_authenticator.get_user(validated_token)
            # logger.info('after get_user')
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
        except:
            logger.info(
                "no token is provided in the header or the header is missing")
            return HttpResponse('nope')

    return middleware
