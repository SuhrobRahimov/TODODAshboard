from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from .models import Project, Note
from .serializers import ProjectSerializer, NoteSerializer
from .paginations import ProjectPageNumberPagination, NotePageNumberPagination
from .filters import ProjectFilter, NoteFilter
from .service import *


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter


class NoteViewSet(ModelViewSet):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    pagination_class = NotePageNumberPagination
    filterset_class = NoteFilter

    def destroy(self, request, pk=None, *args, **kwargs):
        obj = change_note_closed_status(self.queryset, pk)
        serializer = self.serializer_class(obj)
        return Response(serializer.data)
