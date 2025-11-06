from rest_framework import serializers
from accounts.models import Caretaker

class CaretakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caretaker
        fields = ["user_id", "first_name", "last_name", "about_me", "specialisation", "tel_num"]
