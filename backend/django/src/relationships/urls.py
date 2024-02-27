from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>', views.check_handler),
    path('<int:user_id>/followees', views.followees_handler),
    path('<int:user_id>/followers', views.followers_handler),
    path('', views.relationship_handler),
]
