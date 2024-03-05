# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from django.urls import re_path
from .consumers import GameConsumer

# websocket_urlpatterns = [
#     path('ws/game/123/', GameConsumer.as_asgi()),
# ]

websocket_urlpatterns = [
    re_path(r'ws/game/(?P<room_name>\w+)/$', GameConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket': URLRouter(
        websocket_urlpatterns
    ),
})

