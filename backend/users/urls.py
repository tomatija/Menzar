from django.urls import path

from . import views

urlpatterns = [
    path('', views.indexView, name='index'),
    path('login/', views.loginView, name='login'),
    path('logout/', views.logoutView, name='logout'),
    path('register/', views.registerView, name='register'),
    path('<str:username>/', views.profileView, name='profile'),
]
