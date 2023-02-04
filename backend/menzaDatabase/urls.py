from django.urls import path

from . import views

urlpatterns = [
    path('', views.indexView, name='index'),

    # FIXME: WE REALLY NEED TO REMOVE THESE TEST URLS
    path('createDB/', views.createDB, name='test'),
    path('deleteDB/', views.deleteDB, name='test2'),
    path('scrape/', views.scrapeView, name='scrape'),

    # API URLS
    path('api/diners/', views.getAvailableDiners, name='Diners'),
    path('api/menus/<str:dinerName>/',
         views.getDinerAvailabeMenus, name='Diner menus'),


]
