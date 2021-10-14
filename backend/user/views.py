from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import UpdateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.pagination import LimitOffsetPagination

from .models import User
from .serializers import UserSerializer, UserSerializerV2


class UserViewSet(GenericViewSet, ListModelMixin,
                  RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerV2

        return UserSerializer
