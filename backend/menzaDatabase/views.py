from django.http import HttpResponse
from .setupDatabase import *


def indexView(request):
    return HttpResponse("<br>".join(["<h1>Index</h1>", "This is the index page"]))


def createDB(request):
    createDatabase()
    return HttpResponse("Database created")


def deleteDB(request):
    deleteDatabase()
    return HttpResponse("Database deleted")
