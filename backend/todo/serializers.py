from rest_framework import serializers
from .models import *
# from user.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    # users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    # project = ProjectSerializer()
    # user_created = UserSerializer()

    class Meta:
        model = Note
        fields = '__all__'
