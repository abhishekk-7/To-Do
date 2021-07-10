from django.db.models import fields
from rest_framework import serializers
from .models import Task
from account.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = Task
        fields = ('id', 'task', 'done')
