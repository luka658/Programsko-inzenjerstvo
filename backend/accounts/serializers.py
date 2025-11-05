from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "sex", "age", "username"]
        read_only_fields = ["id", "email"]

    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    email = serializers.EmailField(required=True)

    class Meta:
        model=User
        fields=["id", "email", "password", "sex", "age", "username"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            sex=validated_data["sex"],
            age=validated_data["age"],
            username=validated_data["username"]
        )

        return user
    

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=["id", "email", "password"]
        extra_kwargs={"password": {"write_only": True}}

