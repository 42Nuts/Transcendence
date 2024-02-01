# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .consumers import GameConsumer

websocket_urlpatterns = [
    path('ws/game/', GameConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket': URLRouter(
        websocket_urlpatterns
    ),
})
