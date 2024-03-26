"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from login.views import fourtytwo_oauth, home, loginPage, logout
from pongGame.views import game
from django.http import HttpResponse
from django_prometheus import exports as django_prometheus_expots


def health_check(request):
    return HttpResponse("I am Healthy :)")


urlpatterns = [
    path('', loginPage),
    path('logout/', logout),
    path('42oauth/', fourtytwo_oauth),
    path('home/', home),
    path('v2/users/', include('users.urls')),
    path('v2/game/', include('pongGame.urls')),
    path('health/', health_check),
    path('prometheus/', include('django_prometheus.urls')),
    # path('v2/matches/', include('matches.urls')),
    # path('v2/relationships/', include('relationships.urls')),
]
 