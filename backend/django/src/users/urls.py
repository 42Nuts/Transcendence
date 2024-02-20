from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>/dark-mode/', views.dark_mode_handler),
    path('<int:user_id>/theme-index/', views.theme_handler),
    path('<int:user_id>/nickname/', views.nickname_handler),
    path('<int:user_id>/profile-index/', views.profile_url_handler),
    path('<int:user_id>/background-color/', views.background_color_handler),
    path('<int:user_id>/tier-url/', views.tier_url_handler),
    path('<int:user_id>/tier/', views.tier_handler),
    path('<int:user_id>/wins', views.wins_handler),
    path('<int:user_id>/loses/', views.loses_handler),
    path('<int:user_id>/followers-count/', views.followers_count_handler),
    path('<int:user_id>/followings-count/', views.followings_counnt_handler),
    path('<int:user_id>/', views.account_handler),
]
