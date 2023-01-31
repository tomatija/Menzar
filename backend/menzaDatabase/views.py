from backend.settings import DINER_SCRAPERS
from django.http import HttpResponse
from .setupDatabase import *
from language import *
from django.utils import timezone


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


def scrapeView(request):
    menus = DINER_SCRAPERS.getMenus()
    response = ""
    print(menus)
    for menu in menus:
        response += f"{menu.dinerName} / {menu.soupString} / {menu.dishString}<br>"

    for menu in menus:
        diner = Diner.objects.get(name=menu.dinerName)

        soup = None
        try:
            soup = Soup.objects.get(name=menu.soupString)
        except Soup.DoesNotExist:
            soup = Soup(name=menu.soupString).save()

        dish = None
        try:
            dish = Dish.objects.get(name=menu.dishString)
        except Dish.DoesNotExist:
            dish = Dish(name=menu.dishString).save()

        try:
            Menu.objects.get(diner=diner, soup=soup, dish=dish,
                             date=timezone.now().date())
        except Menu.DoesNotExist:
            menu = Menu(diner=diner, soup=soup, dish=dish,
                        date=timezone.now().date()).save()

    return HttpResponse(response)
