from django.urls import path

from . import views

urlpatterns = [
    path('', views.indexView, name='index'),
    path('roznakuhna', views.roznakuhnaView, name='roznakuhna'),
    path('marjetica', views.marjeticaView, name='marjetica'),
]
