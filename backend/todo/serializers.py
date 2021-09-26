from rest_framework import serializers
from .models import *
from user.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=64)
    url = serializers.URLField(required=False)
    users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    text = serializers.CharField()
    project = ProjectSerializer()
    user_created = UserSerializer()
    is_closed = serializers.BooleanField()

    class Meta:
        model = Note
        fields = '__all__'
