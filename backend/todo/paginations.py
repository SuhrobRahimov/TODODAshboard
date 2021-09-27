from rest_framework.pagination import PageNumberPagination


class ProjectPageNumberPagination(PageNumberPagination):
    default_limit = 10


class NotePageNumberPagination(PageNumberPagination):
    default_limit = 20
