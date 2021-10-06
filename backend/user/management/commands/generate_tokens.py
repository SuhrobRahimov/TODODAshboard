from django.core.management.base import BaseCommand

from ...models import User
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = 'Команда генерации/получения токенов для всех пользователей'

    def handle(self, *args, **options):
        for user in User.objects.all():
            obj, result = Token.objects.get_or_create(user=user)
            print(f'Token: {obj}\nGenerate: {result} User: {obj.user}\n')
