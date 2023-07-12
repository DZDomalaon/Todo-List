from django.contrib.auth import authenticate, login
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User
from .managers import get_object_or_None

class LoginSerializer(serializers.Serializer):

    user = None
    email = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(LoginSerializer, self).__init__(*args, **kwargs)

    def validate(self, data):
        email, password = data.values()

        if not email or not password:
            message = _('Email and password are required.')
            raise serializers.ValidationError(message, code='authorization')

        self.user = authenticate(request=self.request, email=email, password=password)

        if not self.user:
            user_detail = get_object_or_None(User, email=email)
            if user_detail:
                if user_detail.check_password(password):
                    self.user = user_detail
                    return data

            message = _('Incorrect email/password.')
            raise serializers.ValidationError(message, code='authorization')
        
        login(self.request, self.user)

        return data

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('email', 'first_name', 'last_name','date_joined', 'date_updated')


class RegisterSerializer(serializers.ModelSerializer):

  user = None
  email = serializers.EmailField(
      validators=[UniqueValidator(
          queryset=User.objects.all(),
          message="This email already exists!"
      )]
  )
  password = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = (
      'email',
      'first_name',
      'last_name',
      'password',
    )

    def create(self, validated_data):
      user = User(
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        email=validated_data['email'],
      )
      user.is_active = False
      user.save()

      return user