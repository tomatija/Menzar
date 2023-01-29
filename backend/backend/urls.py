
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('menzaDatabase.urls')),
    path('users/', include('users.urls'))
]
