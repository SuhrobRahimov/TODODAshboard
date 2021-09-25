from .base import *

DEBUG = True

SECRET_KEY = 'django-insecure-aup3l@$r=$yi+m3s#bin=%pshc5^lnjd(zv1&q##b0gxa993nt'

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LANGUAGE_CODE = 'ru'
