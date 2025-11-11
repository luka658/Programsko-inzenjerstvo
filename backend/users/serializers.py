from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.models import Caretaker
from accounts.serializers import UserSerializer as BaseUserSerializer
from accounts.models import Student

User = get_user_model()


class CaretakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caretaker
        fields = ["user_id", "first_name", "last_name", "about_me", "specialisation", "tel_num"]


class MeSerializer(BaseUserSerializer):
    """Serializer for the current authenticated user including caretaker profile if exists."""
    caretaker = CaretakerSerializer(read_only=True)
    student = serializers.SerializerMethodField()

    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = BaseUserSerializer.Meta.fields + ["caretaker", "student"]
        read_only_fields = BaseUserSerializer.Meta.read_only_fields

    def get_student(self, obj):
        try:
            from accounts.serializers import StudentSerializer as _StudentSerializer
        except Exception:
            return None

        try:
            student = obj.student
        except Exception:
            return None

        return _StudentSerializer(student).data


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "sex", "age"]


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=6)
    new_password2 = serializers.CharField(write_only=True, required=True, min_length=6)

    def validate(self, attrs):
        if attrs.get("new_password") != attrs.get("new_password2"):
            raise serializers.ValidationError({"new_password2": "Lozinke se ne podudaraju."})
        return attrs


class CaretakerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caretaker
        fields = ["first_name", "last_name", "about_me", "specialisation", "tel_num"]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["user_id", "studying_at", "year_of_study", "about_me"]


class StudentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["studying_at", "year_of_study", "about_me"]
