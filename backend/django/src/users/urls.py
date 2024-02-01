from django.urls import path
from .views import login, home, nickname

urlpatterns = [
    path('', login),
    path('home/', nickname),
    path('nickname/', nickname),
]
