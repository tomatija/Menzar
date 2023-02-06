from django.urls.conf import include
from django.urls import path

urlpatterns = [
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
]
