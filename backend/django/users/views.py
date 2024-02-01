import requests
from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from users.models import User


def login(request):
    return render(request, "loginPage.html")


def home(request):
    return render(request, "homePage.html")


def nickname(request):
    authorization_code = request.GET['code']  # 1. resource owwner 승인
    print("authorization_code = ", authorization_code)
    if authorization_code is None:
        return Http404()

    url = (
        f'https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_secret=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&client_id=u-s4t2ud-d10a9ce21bddf5c5122891fa28175e899c5994149a2c95ab9178de72cb1eb491&redirect_uri=https%3A%2F%2F127.0.0.1%2Fhome&response_type=code&code={authorization_code}')
    # 2. access_token 발급 api 호출
    print('url', url)
    response = requests.post(url)
    if response.status_code == 200:
        data = response.json()
        access_token = data['access_token']
        print('access_token', access_token)
        refresh_token = data['refresh_token']

        # 3. user 정보 api 호출
        url = f'https://api.intra.42.fr/v2/me?access_token={ access_token }'
        print('user api 호출', url)
        response = requests.get(url)
        data = response.json()
        email = data['email']
        print('email', email)

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
            print(f"새로운 유저 생성 = {email}")
            print('JsonResponse = ',JsonResponse({'user_id': user.id}))
        else:
            print(f"기존유저 token 업데이트= {email}")
            user.access_token = access_token
            user.refresh_token = refresh_token
            user.save()

    # python 내장함수 vars()로 객체의 __dict__  속성을 반환해서 key, value 출력해보기
        print('유저 객체의 모든 속성과 값 출력')
        for key, value in vars(user).items():
            print(f"{key}: {value}")
    else:
        print('error 입니다!')

    return JsonResponse({'user_id': user.id})


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