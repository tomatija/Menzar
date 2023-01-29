from django.http import HttpResponse
from .setupDatabase import *
from language import *


def indexView(request):
    diners = Diner.objects.all()

    returnStr = ""

    for diner in diners:
        returnStr += f"<a href='/api/{diner.name}/'>{diner.display_name}</a><br>"

    return HttpResponse(returnStr)


def createDB(request):
    createDatabase()
    return HttpResponse("Database created")


def deleteDB(request):
    deleteDatabase()
    return HttpResponse("Database deleted")


def displayDinerMenus(request, dinerName):
    diner = Diner.objects.filter(name=dinerName)

    if len(diner) == 0:
        return HttpResponse(DINER_NOT_FOUND)

    returnStr = ""
    menus = Menu.objects.filter(
        diner=diner.first(), date=timezone.now().date())

    if len(menus) == 0:
        return HttpResponse(DINER_MENUS_UNAVAILABLE)

    for menu in menus:
        returnStr += f"<a href='/api/order/{menu.id}/'>{menu}</a><br>"

    return HttpResponse(returnStr)


def orderMenu(request, menuId):
    menu = Menu.objects.filter(id=menuId)

    if len(menu) == 0:
        return HttpResponse(MENU_NOT_FOUND)

    # user order menu
    # get user
    # user.order(menu)
    return HttpResponse(200)
