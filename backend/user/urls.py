from django.urls import path
from .views import login, home, nickname, get_your_email

urlpatterns = [
    path('', login),
    path('home/', home),
    path('nickname/', nickname),
    path('get_your_email/', get_your_email),
]
