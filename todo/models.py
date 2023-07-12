from django.db import models
from user.models import User

class TodoItem(models.Model):
  title = models.CharField(max_length=150)
  is_completed = models.BooleanField(default=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  date_created = models.DateTimeField(auto_now_add=True)
  date_updated = models.DateTimeField(auto_now=True)

  def __str__(self):
    return "{}".format(self.title)