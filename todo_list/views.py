import re
from django.db.models import manager, query
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import authentication, serializers
from .serializer import TaskSerializer
from rest_framework import generics, mixins
from rest_framework import status
from rest_framework.response import Response
from .models import Task
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
# Create your views here.


class TaskView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    lookup_field = 'id'
    authentication_classes = [TokenAuthentication,
                              BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        task = Task.objects.create(
            user=request.user, task=request.data.get('task'))
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data)

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            tasks = Task.objects.filter(user=request.user).order_by('-id')
            serializer = TaskSerializer(tasks, many=True)
            return JsonResponse(serializer.data, safe=False)

    def delete(self, request, id):
        return self.destroy(request, id)

    def put(self, request, id):
        return self.update(request, id)
