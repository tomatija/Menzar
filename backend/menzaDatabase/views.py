from backend.settings import DINER_SCRAPERS
from django.http import HttpResponse
from .setupDatabase import *
from language import *
from django.utils import timezone
import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder


def getAvailableDiners(request):
    diners = Diner.objects.all()

    rawData = serializers.serialize('python', list(diners))
    filteredData = [d['fields'] for d in rawData]
    return HttpResponse(json.dumps(filteredData, cls=DjangoJSONEncoder), content_type="application/json")


def getDinerAvailabeMenus(request, dinerName):
    diner = Diner.objects.filter(name=dinerName)

    if len(diner) == 0:
        return HttpResponse(DINER_NOT_FOUND)

    menus = Menu.objects.filter(
        diner=diner.first(), date=timezone.now().date())

    if len(menus) == 0:
        return HttpResponse(DINER_MENUS_UNAVAILABLE)
    res = list()
    for menu in menus:
        tmpMenu = {}
        tmpMenu['soup'] = menu.soup.name
        tmpMenu['dish'] = menu.dish.name
        tmpMenu['diner'] = menu.diner.name
        res.append(tmpMenu)

    return HttpResponse(json.dumps(res))

    # TODO: Create a better way to serialize the data
    rawData = serializers.serialize('python', list(diners))
    filteredData = [d['fields'] for d in rawData]
    return HttpResponse(json.dumps(filteredData, cls=DjangoJSONEncoder), content_type="application/json")


# HELPER VIEWS
def indexView(request):
    return HttpResponse("Hello, world. You're at the menzaDatabase index.")
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
        # print(menu)
        response += f"{menu.dinerName} / {menu.soupString} / {menu.dishString}<br>"

    for menu in menus:
        print(menu)
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
