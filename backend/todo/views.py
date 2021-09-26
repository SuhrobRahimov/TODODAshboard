from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import *
from .serializers import *


class ProjectViewSet(ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class NoteViewSet(ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
