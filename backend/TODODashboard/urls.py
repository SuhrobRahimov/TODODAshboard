from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/api-auth/', include('rest_framework.urls')),
    path('auth/api-token/', obtain_auth_token),
    path('auth/jwt-token/', TokenObtainPairView.as_view()),
    path('auth/jwt-token/refresh/', TokenRefreshView.as_view()),
    path('api/users/', include('user.urls')),
    path('api/todo/', include('todo.urls'))
]
