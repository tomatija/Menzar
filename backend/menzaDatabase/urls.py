from django.urls import path

from . import views

urlpatterns = [
    path('', views.indexView, name='index'),

    # FIXME: WE REALLY NEED TO REMOVE THESE TEST URLS
    path('createDB/', views.createDB, name='test'),
    path('deleteDB/', views.deleteDB, name='test2'),
    path('scrape/', views.scrapeView, name='scrape'),

    # API URLS
    # DINERS
    path(
        'diners/',
        views.getAvailableDiners,
        name='Diners'
    ),

    # MENUS
    path(
        '<str:dinerName>/<str:dateString>/',
        views.getDinerMenusByDate,
        name='Diner menus by date'
    ),
    path(
        'menus/<int:menuId>/',
        views.getMenuDetails,
        name='Comments'
    ),
    path(
        'menus/<int:menuId>/orders/',
        views.getMenuOrders,
        name='Orders'
    ),

    # USERS
    path(
        'users/',
        views.getUsers,
        name='Users'
    ),
    path(
        'users/<int:userId>/',
        views.getUserDetails,
        name='User details'
    ),
    path(
        'users/<int:userId>/orders/',
        views.getUserOrders,
        name='User orders'
    ),

    # ORDERS
    # path('orders/<int:orderId>/', views.getOrderDetails, name='Order details'),



]
