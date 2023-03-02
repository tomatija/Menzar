from datetime import datetime
from backend.settings import DINER_SCRAPERS
from django.http import HttpResponse
from .setupDatabase import *
from language import *
from django.utils import timezone
import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from .serializers.serializers import DinerSerializer, MenuSerializer, OrderSerializer, ReviewSerializer
from rest_framework.decorators import api_view


def getAvailableDiners(request):
    diners = Diner.objects.all()
    serializedData = DinerSerializer(diners, many=True).data
    return HttpResponse(json.dumps(serializedData))


def getDinerMenus(dinerName, date):
    diner = Diner.objects.filter(name=dinerName)

    if len(diner) == 0:
        return HttpResponse(DINER_NOT_FOUND)

    menus = Menu.objects.filter(
        diner=diner.first(), date=date)

    if len(menus) == 0:
        return HttpResponse(DINER_MENUS_UNAVAILABLE)

    serializedData = MenuSerializer(menus, many=True).data
    return HttpResponse(json.dumps(serializedData))


def userOrder(request, username, menuID):
    '''
        Creates an order for a given user and menu
    '''
    user = User.objects.filter(username=username)
    if len(user) == 0:
        return HttpResponse(USER_NOT_FOUND)

    menu = Menu.objects.filter(pk=menuID)

    if len(menu) == 0:
        return HttpResponse(MENU_NOT_FOUND)

    if len(menu) > 1:
        return HttpResponse(MENU_INVALID)

    try:
        order = Order.objects.get(user=user.first(), menu=menu.first())
        return HttpResponse(ORDER_ALREADY_EXISTS)
    except Order.DoesNotExist:
        order = Order(user=user.first(), menu=menu.first())
        order.save()
    return HttpResponse("Order created successfully.")


def getDinerMenusByDate(request, dinerName, dateString):
    '''
        Returns all menus for a given diner on a given date
    '''
    date = None
    if type(dateString) == str:
        if dateString == "today":
            date = timezone.now().date()
        else:
            date = datetime.strptime(dateString, '%d-%m-%Y').date()

    if date is None:
        return HttpResponse(DINER_NO_MENUS_ON_DATE)

    return getDinerMenus(dinerName, date)


def getMenuDetails(request, menuId):
    '''
        Returns all details for a given menu
    '''
    return HttpResponse("API not implemented yet.")


def getMenuOrders(request, menuId):
    '''
        Returns all orders for a given menu
    '''
    return HttpResponse("API not implemented yet.")


def getUsers(request):
    '''
        Returns all users in the database
    '''
    # Probably need to add some kind of authentication or even not implement this
    return HttpResponse("API not implemented yet.")


def getUserDetails(request, userId):
    '''
        Gets all details of a given user
    '''
    return HttpResponse("API not implemented yet.")


def getUserOrders(request, username):
    '''
        Gets all orders of a given user
    '''
    user = User.objects.filter(username=username)
    if len(user) == 0:
        return HttpResponse(USER_NOT_FOUND)

    orders = Order.objects.filter(user=user.first()).order_by('-timestamp')
    serializedData = OrderSerializer(orders, many=True).data
    return HttpResponse(json.dumps(serializedData, cls=DjangoJSONEncoder))


def deleteUserOrder(request, pk):
    # TODO: check if request came from corrent user (by username)
    orders = Order.objects.filter(pk=pk)
    if not len(orders) == 0:
        orders.first().delete()

    return HttpResponse("order deleted")


# HELPER VIEWS


def indexView(request):
    '''
        Index view for the API
    '''
    return HttpResponse("Hello, world. You're at the API index.")
    diners = Diner.objects.all()

    rawData = serializers.serialize('python', list(diners))
    filteredData = [d['fields'] for d in rawData]
    return HttpResponse(json.dumps(filteredData, cls=DjangoJSONEncoder), content_type="application/json")


def createDB(request):
    createDatabase()
    return HttpResponse("Database created")


def deleteDB(request):
    deleteDatabase()
    return HttpResponse("Database deleted")


def scrapeView(request):
    menus = DINER_SCRAPERS.getMenus()
    response = ""

    for menu in menus:
        response += f"{menu.dinerName} / {menu.soupString} / {menu.dishString}<br>"

    for menu in menus:
        diner = Diner.objects.get(name=menu.dinerName)

        soup = None
        try:
            soup = Soup.objects.get(name=menu.soupString)
        except Soup.DoesNotExist:
            soup = Soup(name=menu.soupString)
            soup.save()

        dish = None

        try:
            dish = Dish.objects.get(name=menu.dishString)
        except Dish.DoesNotExist:
            dish = Dish(name=menu.dishString)
            dish.save()

        try:
            Menu.objects.get(diner=diner, soup=soup, dish=dish,
                             date=timezone.now().date())
        except Menu.DoesNotExist:
            menu = Menu(diner=diner, soup=soup, dish=dish,
                        date=timezone.now().date())
            menu.save()

    return HttpResponse(response)


@api_view(['POST'])
def createReview(request):
    """
    First checks if a review with the given ID already exists.
    If it does, it updates the existing review.
    If it doesn't, it creates a new review.
    """

    reviewID = request.data.get('review')
    review = Review.objects.filter(pk=reviewID)

    serializer = None
    if len(review) == 0:
        serializer = ReviewSerializer(data=request.data)
    else:
        serializer = ReviewSerializer(
            instance=review.first(), data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return HttpResponse(serializer.data)
