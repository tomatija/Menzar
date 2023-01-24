
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('', include('menzaBase.urls')),
    path('menze/', include('menzaBase.urls')),
    path('admin/', admin.site.urls),
]
