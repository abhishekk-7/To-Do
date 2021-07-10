from django.urls import path
from rest_framework.authtoken.models import Token
from .views import RegisterView, LoginView, LoggedIn, Login2View
from rest_framework.authtoken import views

urlpatterns = [
    # path('login/',),
    path('register/', RegisterView.as_view()),
    path('login/', views.obtain_auth_token),
    path('login2/', Login2View.as_view()),
    path('loggedIn/', LoggedIn.as_view()),
]
