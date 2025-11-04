from django.shortcuts import render

from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        if User.objects.filter(email=email).exists():
            return Response({"error": "Korisnik s ovim email-om već postoji"}, status=400)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(access),
        })

        response.set_cookie(
            key="accessToken",
            value=str(access),
            httponly=True,
            secure=True,
            samesite=None,
            path="/"
        )

        response.set_cookie(
            key="refreshToken",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite=None,
            path="/"
        )

        return response
    
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes=[AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data["email"]
        password=request.data["password"]

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({"error": "Neispravno korisničko ime ili lozinka"}, status=400)
        

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(access),
        })

        response.set_cookie(
            key="accessToken",
            value=str(access),
            httponly=True,
            secure=True,
            samesite=None,
            path="/"
        )

        response.set_cookie(
            key="refreshToken",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite=None,
            path="/",
        )

        return response