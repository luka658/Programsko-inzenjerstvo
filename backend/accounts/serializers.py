from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from accounts.models import Caretaker, Student

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "sex", "age", "username", "role"]
        read_only_fields = ["id", "email"]

    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(queryset=User.objects.all(), message="Korisnik s ovim email-om već postoji")
    ])

    def validate_email(self, value):
        return value.strip().lower()

    class Meta:
        model=User
        fields=["id", "first_name", "last_name", "email", "username", "password", "sex", "age"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data.pop('email'),
            username=validated_data.pop('username'),
            password=validated_data.pop('password'),
            sex=validated_data.pop('sex'),
            age=validated_data.pop('age'),
            role=validated_data.pop('role'),
        )
        return user



class CaretakerRegisterSerializer(serializers.ModelSerializer):
    user = RegisterSerializer()

    class Meta:
        model = Caretaker
        fields = ["user", "academic_title", "help_categories", "user_image_url", "specialisation", "about_me", "working_since", "tel_num", "office_address"]

    # def validate(self, data):
    #     if User.objects.filter(username=data['username'], student__isnull=False).exists():
    #         raise serializers.ValidationError("This user is already registered as a student.")
    #     return data

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_data["role"] = "caretaker"

        help_categories = validated_data.pop("help_categories", None)

        user = RegisterSerializer().create(user_data)

        caretaker = Caretaker.objects.create(user=user, **validated_data)

        if help_categories is not None:
            caretaker.help_categories.set(help_categories)
            
        return caretaker



class StudentRegisterSerializer(serializers.ModelSerializer):
    user = RegisterSerializer()

    class Meta:
        model = Student
        fields = ["user", "studying_at", "year_of_study", "is_anonymous"]

    # def validate(self, data):
    #     if User.objects.filter(username=data['username'], caretaker__isnull=False).exists():
    #         raise serializers.ValidationError("This user is already registered as a caretaker.")
    #     return data

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_data["role"] = "student"

        user = RegisterSerializer().create(user_data)

        student = Student.objects.create(user=user, **validated_data)
        return student

    

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=["id", "email", "password"]
        extra_kwargs={"password": {"write_only": True}}

