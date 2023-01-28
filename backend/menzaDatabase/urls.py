from django.urls import path

from . import views

urlpatterns = [
    path('', views.indexView, name='index'),
    
    #FIXME: WE REALLY NEED TO REMOVE THESE TEST URLS
    path('createDB/', views.createDB, name='test'),
    path('deleteDB/', views.deleteDB, name='test2'),
]
