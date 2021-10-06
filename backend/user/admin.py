from django.contrib import admin

from .models import User
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    # Так как изначально я решил делать поля "firstname" и подобные без "_"
    # То столкнулся с тем что нужно поля переопределить в стандартном UserAdmin
    # Так как все равно залез сюда, разбил на более понятные группы все поля
    # Так же убрал блок "важные даты" так как он по логике моей модели заполняет сам
    fieldsets = (
        ('Account', {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('firstname', 'lastname', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Access level', {'fields': ('groups', 'user_permissions')})
    )
    list_display = ('id', 'username', 'email', 'firstname', 'lastname',
                    'is_active', 'is_staff', 'is_superuser',
                    'created_at', 'updated_at', 'last_login')
    search_fields = ('username', 'firstname', 'lastname', 'email')


admin.site.register(User, CustomUserAdmin)
