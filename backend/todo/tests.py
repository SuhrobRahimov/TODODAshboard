import json
import random

from django.conf import settings
from mixer.backend.django import mixer

from rest_framework import status
from rest_framework.test import APIClient, APITestCase, APIRequestFactory, force_authenticate

from rest_framework.authtoken.models import Token
from .models import Project, Note
from .views import ProjectViewSet
from .serializers import ProjectSerializer


class ProjectTestCase(APITestCase):
    def setUp(self):
        self.user = mixer.blend(settings.AUTH_USER_MODEL, is_superuser=False)
        self.user_token, _ = Token.objects.get_or_create(user=self.user)
        self.user_pack = []
        for _ in range(0, 10):
            self.user_pack.append(mixer.blend(settings.AUTH_USER_MODEL))

        self.project = mixer.blend(Project, users=self.user_pack)
        self.note = mixer.blend(Note, project=self.project, user_created=random.choice(self.user_pack), is_closed=False)

    def test_project_list(self):
        res = self.client.get('/api/todo/projects/')
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.user_token}')
        res = self.client.get('/api/todo/projects/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        res_json = json.loads(res.content)
        self.assertEqual(res_json.get('results')[0].get('name'), self.project.name)

    def test_project_create_anon(self):
        factory = APIRequestFactory()
        view = ProjectViewSet.as_view({'post': 'create'})
        request = factory.post(f'/api/todo/projects/', ProjectSerializer(self.project).data, format='json')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_project_create_user(self):
        factory = APIRequestFactory()
        view = ProjectViewSet.as_view({'post': 'create'})
        request = factory.post(f'/api/todo/projects/', ProjectSerializer(self.project).data, format='json')
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_note_delete(self):
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f'Token {self.user_token}')
        response = client.delete(f'/api/todo/notes/{self.note.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = client.get(f'/api/todo/notes/{self.note.id}/')
        self.assertEqual(response.json().get('isClosed'), True)
