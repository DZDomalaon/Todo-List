from django.urls import path, re_path

from .api import Login, Logout, Register

urlpatterns = [
  path('login/', Login.as_view(), name="login"),
  path('logout/', Logout.as_view(), name="logout"),
  path('register/', Register.as_view(), name="register"),
]