from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
from rest_framework.authtoken import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

# Create your views here.


class RegisterView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        print('***************')
        print(request.data)
        print('***************')

        user.set_password(serializer.validated_data.get('password'))
        user.save()

        return Response({"user": serializer.data, "token": Token.objects.create(user=user).key}, status=201)


class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        return Response({"content": serializer})


class LoggedIn(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        if request.user.is_authenticated:
            token = Token.objects.get(user=request.user)
            return Response({
                "success": True,
                "user": UserSerializer(request.user).data,
                "token": token.key
            }, status=201)
        else:
            return Response({
                "success": False,
            }, status=201)


class Login2View(generics.GenericAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = User.objects.get(username=username)
            login(request, user)
        except:
            return Response({
                "error": "user not found",
                "success": False
            }, status=201)
        serializer = UserSerializer(user)
        return Response({
            "success": True,
            "user": serializer.data,
            "token": Token.objects.get(user=user).key
        }, status=201)
