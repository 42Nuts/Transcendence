import requests
from django.shortcuts import render
from django.http import Http404


def login(request):
    return render(request, "loginPage.html")


def home(request):
    return render(request, "homePage.html")


def nickname(request):
    authorization_code = request.GET['code']
    print('code', authorization_code)
    if authorization_code is None:
        return Http404()

    # url = 'https://api.intra.42.fr/oauth/token'
    # data = {
    #     'grant_type': 'authorization_code',
    #     'client_secret': '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',
    #     'code': authorization_code,
    #     'client_id': 'u-s4t2ud-d10a9ce21bddf5c5122891fa28175e899c5994149a2c95ab9178de72cb1eb491',
    #     'redirect_uri': 'http%3A%2F%2F127.0.0.1%3A8000%2Fnickname',
    #     'response_type': 'code'
    # }
    # response = requests.post(url, data=data)
    url = (f'https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_secret=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&client_id=u-s4t2ud-d10a9ce21bddf5c5122891fa28175e899c5994149a2c95ab9178de72cb1eb491&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fnickname&response_type=code&code={authorization_code}')
    print(url)
    response = requests.post(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        print(data)
    else:
        print('error 입니다!')
    return render(request, "nicknamePage.html")
