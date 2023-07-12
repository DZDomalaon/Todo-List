import datetime

from django.conf import settings

from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from rest_framework.authtoken.models import Token

from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=500, unique=True)
  first_name = models.CharField(max_length=80, null=True, blank=True)
  last_name = models.CharField(max_length=80, null=True, blank=True)
  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  date_joined = models.DateTimeField(auto_now_add=True)
  date_updated = models.DateTimeField(auto_now=True)

  USERNAME_FIELD = "email"
  objects = UserManager()

  def __str__(self):
    return "{}".format(self.email)

  def get_token(self):
    """Generates valid token."""
    token, created = Token.objects.get_or_create(user=self)
    expiry_date = token.created + datetime.timedelta(days=settings.AUTH_TOKEN_EXPIRY_TIME)
    if not created and expiry_date < timezone.now():
      # delete token and generate a new one
      token.delete()
      token = Token.objects.create(user=self)
    return token

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    User.get_token(instance)