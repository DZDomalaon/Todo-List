from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import TodoItem
from .serializers import TodoSerializer

class TodoView(ViewSet):

  serializer_class = TodoSerializer

  def get(self, *args, **kwargs):
    todo_items = TodoItem.objects.filter(user=self.request.user)
    serializer = self.serializer_class(todo_items, many=True)
    return Response(serializer.data, status=200)

  def create(self, *args, **kwargs):
    serializer = self.serializer_class(data=self.request.data)
    if serializer.is_valid():
      serializer.save(user=self.request.user)
      return Response(serializer.data, status=200)
    return Response(serializer.errors, status=200)

  def update(self, *args, **kwargs):
    serializer = self.serializer_class(
      instance=TodoItem.objects.get(id=self.kwargs.get('id')),
      data=self.request.data,
      partial=True,
      request=self.request
    )
    if serializer.is_valid(raise_exception=True):
      serializer.save()
    return Response(serializer.data, status=200)

  def delete(self, *args, **kwargs):
    todo_item = get_object_or_404(TodoItem, id=kwargs.get('id'))
    if(self.request.user == todo_item.user):
      todo_item.delete()
      return Response({}, status=200)
    else:
      return Response('error', status=400)