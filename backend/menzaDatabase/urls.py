from django.urls import path

from . import views

urlpatterns = [
    path('', views.indexView, name='index'),

    # FIXME: WE REALLY NEED TO REMOVE THESE TEST URLS
    path('createDB/', views.createDB, name='test'),
    path('deleteDB/', views.deleteDB, name='test2'),
    path('api/<str:dinerName>/', views.displayDinerMenus, name='diner'),
    path('api/order/<int:menuId>/', views.orderMenu, name='menu'),
    path('scrape/', views.scrapeView, name='scrape')
]
