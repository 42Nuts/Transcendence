from django.urls import path
from . import views

urlpatterns = [
    path('history/<int:user_id>', views.history_handler),
    path('', views.match_handler),
    path('<int:match_id>', views.in_match_handler),
]
