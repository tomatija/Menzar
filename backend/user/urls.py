from django.urls import path
from . import views
from .views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns=[
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', registerUser, name='register user')
    #path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
