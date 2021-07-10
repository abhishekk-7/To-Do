from django.db import models
from django.contrib.auth.models import User
from django.db.models.expressions import OrderBy

# Create your models here.


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.CharField(max_length=50)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.task
