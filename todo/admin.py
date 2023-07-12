from django.contrib import admin

from .models import TodoItem

class TodoItemAdmin(admin.ModelAdmin):
  list_display = ('title', 'user', 'is_completed', 'date_created', 'date_updated')
  search_fields = ('title', 'user__email')
  list_filter = ('is_completed', )


admin.site.register(TodoItem, TodoItemAdmin)