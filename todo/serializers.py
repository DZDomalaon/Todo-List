from rest_framework import serializers
from .models import TodoItem
from user.serializers import UserSerializer

class TodoSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = TodoItem
    fields = ('id', 'title', 'user', 'is_completed','date_created', 'date_updated')

  def __init__(self, *args, **kwargs):
    self.request = kwargs.pop('request', None)
    return super(TodoSerializer, self).__init__(*args, **kwargs)