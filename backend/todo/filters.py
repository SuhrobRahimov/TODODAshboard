from rest_framework import generics
from django_filters import rest_framework as filters
from .models import Project, Note


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class NoteFilter(filters.FilterSet):
    created_at = filters.DateFromToRangeFilter()

    class Meta:
        model = Note
        fields = ['project', 'project__name']
