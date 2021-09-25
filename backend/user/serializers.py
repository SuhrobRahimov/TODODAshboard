from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    # Указываем у поля пароля возможность только записи
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate(self, data):
        pwd_long = 5
        if len(data.get('password', '')) < pwd_long:
            raise serializers.ValidationError(f"The password must be more than {pwd_long} characters long")
        return data

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'username', 'firstname', 'lastname')
