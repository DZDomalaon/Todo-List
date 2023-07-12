from django.urls import path, re_path

from .api import TodoView

urlpatterns = [
  path('item/', TodoView.as_view({
        'get': 'get',
        'post': 'create'
  }), name="todo_items"),
  path('item/<int:id>/', TodoView.as_view({
        'post': 'update',
        'get': 'delete'
  }), name="todo_item"),
]