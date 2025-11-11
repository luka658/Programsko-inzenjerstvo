from rest_framework import serializers
from accounts.models import Caretaker

class CaretakerShortSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    help_categories = serializers.SlugRelatedField(many=True, read_only=True, slug_field='label')

    class Meta:
        model = Caretaker
        fields = ["user_id", "first_name", "last_name", "academic_title", "help_categories", "user_image_url", "specialisation", "working_since"]


class CaretakerLongSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    help_categories = serializers.SlugRelatedField(many=True, read_only=True, slug_field='label')

    class Meta:
        model = Caretaker
        fields = ["user_id", "first_name", "last_name", "academic_title", "help_categories", "user_image_url", "specialisation", "about_me", "working_since", "tel_num", "office_address"]
