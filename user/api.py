from django.contrib.auth import logout

from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import RegisterSerializer, LoginSerializer

class Login(APIView):

  authentication_classes = ()
  permission_classes = (AllowAny,)
  serializer_class = LoginSerializer

  def get(self, *args, **kwargs):
    try:
      user = User.objects.get(id=self.request.GET.get('id'))
    except:
      return Response(status=400)
    token = Token.objects.get(user=user)
    return Response({'token': token.key}, status=200)

  def post(self, *args, **kwargs):
    serializer = self.serializer_class(
        data=self.request.data, request=self.request
    )
    serializer.is_valid(raise_exception=True)
    token = Token.objects.get(user=serializer.user)
    response = {
        'user_id': serializer.user.id,
        'is_active': serializer.user.is_active,
        'token': token.key
    }

    return Response(response, status=200)


class Logout(APIView):
  permission_classes = (IsAuthenticated,)

  def post(self, *args, **kwargs):
    logout(self.request)
    return Response(status=200)


class Register(APIView):

  authentication_classes = ()
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer

  def post(self, *args, **kwargs):
      serializer = self.serializer_class(data=self.request.data)
      if serializer.is_valid():
          user = serializer.save()
          user.set_password(self.request.data.get('password'))
          user.save()
          token = Token.objects.get(user=user)
          token_data = {"token": token.key}
          return Response(token_data, status=200)
      return Response(serializer.errors, status=400)