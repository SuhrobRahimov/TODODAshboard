from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import UpdateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.pagination import LimitOffsetPagination

from .models import User
from .serializers import UserSerializer


class UserViewSet(GenericViewSet, ListModelMixin,
                  RetrieveModelMixin, UpdateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    pagination_class = LimitOffsetPagination
