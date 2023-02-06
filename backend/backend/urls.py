
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from accounts.urls import urlpatterns as accounts_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('menzaDatabase.urls')),
    path('api/v1/', include('djoser.urls')),
    path('api/v1/', include('djoser.urls.authtoken')),
]

urlpatterns += accounts_urls
