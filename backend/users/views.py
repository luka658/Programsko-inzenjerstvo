from django.db.models import Q
from accounts.models import Caretaker, Student
from .serializers import CaretakerLongSerializer, CaretakerShortSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(["GET"])
def search_caretakers(request):
    query = request.GET.get("q", "").strip()

    print(query)

    if not query:
        return Response([])

    caretakers = Caretaker.objects.filter(
        Q(user__first_name__icontains=query) |
        Q(user__last_name__icontains=query)
    )

    serialized = CaretakerShortSerializer(caretakers, many=True)
    return Response(serialized.data)


from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import (
    MeSerializer,
    UpdateUserSerializer,
    ChangePasswordSerializer,
    CaretakerUpdateSerializer,
)


@api_view(["GET", "PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def my_profile(request):
    user = request.user
    if request.method == "GET":
        serializer = MeSerializer(user)
        return Response(serializer.data)

    partial = request.method == "PATCH"
    serializer = UpdateUserSerializer(user, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(MeSerializer(user).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    old = serializer.validated_data.get("old_password")
    if not user.check_password(old):
        return Response({"old_password": "Pogrešna trenutna lozinka."}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(serializer.validated_data.get("new_password"))
    user.save()
    return Response({"detail": "Lozinka je uspješno promijenjena."}, status=status.HTTP_200_OK)


@api_view(["GET", "PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def my_caretaker_profile(request):
    try:
        caretaker = request.user.caretaker
    except Caretaker.DoesNotExist:
        return Response({"detail": "Korisnik nije psiholog/caretaker."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(CaretakerShortSerializer(caretaker).data)

    partial = request.method == "PATCH"
    serializer = CaretakerUpdateSerializer(caretaker, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(CaretakerShortSerializer(caretaker).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def my_student_profile(request):
    try:
        student = request.user.student
    except Student.DoesNotExist:
        return Response({"detail": "Korisnik nije student."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        from .serializers import StudentSerializer
        return Response(StudentSerializer(student).data)

    partial = request.method == "PATCH"
    from .serializers import StudentUpdateSerializer
    serializer = StudentUpdateSerializer(student, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        from .serializers import StudentSerializer
        return Response(StudentSerializer(student).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def caretakerById(request, id):
    try:
        caretaker = Caretaker.objects.get(user_id=id)
    except:
        return Response({"error":f"No caretaker was found matching the specified ID ({id})."}, status=404)

    serialized = CaretakerLongSerializer(caretaker)
    return Response(serialized.data)


#jos se ne koristi
@api_view(["GET"])
def caretakerBySlug(request, slug):
    return Response(f"slug: {id}")
