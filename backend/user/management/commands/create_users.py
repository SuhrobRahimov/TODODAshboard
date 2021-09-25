import random

from django.core.management.base import BaseCommand

from ...models import User


def create_test_users() -> dict:
    users = dict(users=list())
    for _ in range(0, 3):
        pwd = make_password()
        user = User.objects.create_user(email=make_email(),
                                        password=pwd,
                                        username='Test',
                                        firstname='Test',
                                        lastname='Autogeneratopvich')
        users.get('users').append(dict(user=str(user), password=pwd))
    return users


def create_superuser() -> dict:
    pwd = make_password(root=True)
    superuser = User.objects.create_superuser(email=make_email(root=True),
                                              password=pwd,
                                              username='Root',
                                              firstname='Groot',
                                              lastname='Rootovich')
    return dict(superuser=dict(user=str(superuser), password=pwd))


def create_string(users: dict) -> str:
    info = ""
    if users.get('superuser'):
        info += f"SuperUser:\n" \
                f"Login - {users.get('superuser').get('user')}\n" \
                f"Password - {users.get('superuser').get('password')}\n\n"

    if users.get('users'):
        info += f"TestUsers:\n"
        for user in users.get('users'):
            info += f"Login - {user.get('user')}\n" \
                    f"Password - {user.get('password')}\n"

    return info


def make_email(root: bool = False) -> str:
    prefix = ''.join(random.choices([str(n) for n in range(1, 9)], k=5))
    if root:
        prefix += '-root'
    return f'{prefix}@telezon.ru'


def make_password(root: bool = False) -> str:
    if root:
        length = 25
    else:
        length = 5
    return User.objects.make_random_password(length)


class Command(BaseCommand):
    help = 'Скрипт создания суперпользователя и нескольких тестовых пользователей'

    def handle(self, *args, **options):
        users = create_superuser()
        users.update(create_test_users())
        print(create_string(users))
