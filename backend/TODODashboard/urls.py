from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.schemas import get_schema_view
from graphene_django.views import GraphQLView

from drf_yasg.views import get_schema_view as yasg_get_schema_view
from drf_yasg import openapi

yasg_schema_view = yasg_get_schema_view(
    openapi.Info(
        title="TODO Dashboard",
        default_version='1',
        description="Документация к большому API",
        contact=openapi.Contact(email="dev@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

drf_schema_view = get_schema_view(
    title="TODO Dashboard",
    description="Документация к маленькому API",
    version="1.0.0"
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/api-auth/', include('rest_framework.urls')),
    path('auth/api-token/', obtain_auth_token),
    path('auth/jwt-token/', TokenObtainPairView.as_view()),
    path('auth/jwt-token/refresh/', TokenRefreshView.as_view()),
    path('api/users/', include('user.urls', namespace='v1')),
    path('api/v2/users/', include('user.urls', namespace='v2')),
    path('api/todo/', include('todo.urls')),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            yasg_schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', yasg_schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),

    path('openapi/', drf_schema_view, name='openapi-schema'),
    path('redoc/', TemplateView.as_view(
        template_name='todo/redoc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='redoc'),

    path("graphql/", GraphQLView.as_view(graphiql=True)),

]
