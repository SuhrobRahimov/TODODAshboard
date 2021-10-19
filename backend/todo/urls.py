from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls))
]
