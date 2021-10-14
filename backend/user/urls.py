from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework.routers import DefaultRouter
from .views import UserViewSet

app_name = 'user'

router = DefaultRouter()
router.register('', UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]
