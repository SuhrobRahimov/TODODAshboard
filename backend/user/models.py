from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    """
    Django требует, чтобы кастомные пользователи определяли свой собственный класс Manager.
    """

    def create_user(self, email: str, password: str or None = None, **kwargs) -> models.Model:
        """
        Создает стандартного пользователя
        """
        # Проверим входящие данные на верность
        if not isinstance(email, str):
            raise TypeError('Email or password type incorrect')

        user = self.model(email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email: str, password: str, **kwargs) -> models.Model:
        """
        Создаем суперпользователя
        """
        # Все стандартно, только у супер пользователя обязательно должен быть пароль
        # На будущее - проверку на сложность вставить тут
        if not isinstance(password, str):
            raise TypeError('Superusers must have a password.')

        user = self.create_user(email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    Кастомная модель пользователя
    """
    # Уникальный email пользователя
    email = models.EmailField(max_length=100, unique=True)
    # Информация о нашем пользователе
    username = models.CharField(max_length=65)
    firstname = models.CharField(max_length=65)
    lastname = models.CharField(max_length=65)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    # Временная метка создания объекта.
    created_at = models.DateTimeField(auto_now_add=True)
    # Временная метка показывающая время последнего обновления объекта.
    updated_at = models.DateTimeField(auto_now=True)

    # Свойство USERNAME_FIELD сообщает нам, какое поле мы будем использовать для входа в систему.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # Сообщает Django, что определенный выше класс UserManager
    # должен управлять объектами этого типа.
    objects = UserManager()

    class Meta:
        db_table = 'app_user'
        verbose_name = "user"
        verbose_name_plural = "users"
