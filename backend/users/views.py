from django.http import HttpResponse
from django.shortcuts import render

from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.conf import settings
from django.core.mail import send_mail
# Create your views here.


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get("email")
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
            secure=False,    #True
            samesite='Lax', #None
            path="/"
        )

        response.set_cookie(
            key="refreshToken",
            value=str(refresh),
            httponly=True,
            secure=False, #True
            samesite='Lax', #None
            path="/"
        )

        return response
    
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes=[AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password=request.data.get("password")

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
            secure=False, #True
            samesite='Lax', #None
            path="/"
        )

        response.set_cookie(
            key="refreshToken",
            value=str(refresh),
            httponly=True,
            secure=False, #True
            samesite='Lax', #None
            path="/",
        )

        return response
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logoutView(request):
    response = Response({"message": "Uspješno odjavljen"}, status=200)
    response.delete_cookie("accessToken")
    response.delete_cookie("refreshToken")

    return response


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUserView(request):
    # if request.user.id != user_id and not (request.user.is_staff or request.user.is_superuser):
    #     return Response({"error": "Normalan korisnik može obrisati samo svoj račun."}, status=403)
    try:
        user = User.objects.get(id=request.user.id)
    except User.DoesNotExist:
        return Response({"erro  r": "Korisnik ne postoji"}, status=404)
    
    user.delete()
    return Response({"message": "Korisnik uspješno izbrisan"}, status=204)



@api_view(['POST'])
@permission_classes([AllowAny])
def requestPasswordResetView(request):
    email = request.data.get("email")

    if not email:
        return Response({"error": "Molim upisati ispravan email"}, status=400)
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Korisnik s ovim emailom ne postoji"}, status=404)
    
    token = default_token_generator.make_token(user)

    uid = urlsafe_base64_encode(force_bytes(user.id))
    
    reset_link = f"{settings.FRONTEND_URL}/auth/reset-password/{uid}/{token}/"

    send_mail(
        subject="Resetiraj svoju lozinku - CareFree",
        message=f"Klikni na link da promijeniš svoju lozinku:\n{reset_link}",
        from_email="carefree_reset_pass@gmail.com",
        recipient_list=[email],
    )

    return Response({"message": "Poslali smo link za resetiranje svog passworda na Vaš email."}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def resetPasswordConfirmView(request, uidb64, token):
    password = request.data.get("password")
    repeatPassword = request.data.get("repeatPassword")

    if not password or not repeatPassword:
        return Response({"error": "Potrebno je upisati lozinke."}, status=400)
    
    if password != repeatPassword:
        return Response({"error": "Lozinke se ne podudaraju."}, status=400)
    
    if len(password) < 6:
        return Response({"error": "Lozinka mora sadržavati barem 6 znakova"}, status=400)
    
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(id=uid)
    except Exception:
        return Response({"error": "Neispravan link."}, status=400)
    
    if not default_token_generator.check_token(user, token):
        return Response({"error": "Token nije valjan ili je istekao"}, status=400)
    
    if user.check_password(password):
        return Response({"error": "Nova lozinka ne može biti ista kao stara lozinka."}, status=400)
    
    user.set_password(password)
    user.save()

    response = Response({"message": "Lozinka je uspješno resetirana."}, status=200) 
    response.delete_cookie("accessToken")
    response.delete_cookie("refreshToken")
    return response

def caretakers(request):
    res = request.GET.get('name', 'x')
    return HttpResponse(f"caretaker page: {res}")