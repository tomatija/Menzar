from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from language import *
from django.contrib.auth import authenticate, login, logout

# TODO: Checks this for user handling
# https://docs.djangoproject.com/en/4.1/topics/http/sessions/


def indexView(request):
    return HttpResponse("OK")


def loginView(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponse(LOGIN_SUCCESSFUL)
        else:
            return HttpResponse(USER_NOT_FOUND)

    return HttpResponse(LOGIN_FAILED)


def logoutView(request):
    logout(request)
    return HttpResponse("OK")


def registerView(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        user = User.objects.create_user(username, email, password)
        user.save()

        return HttpResponse("OK")

    return HttpResponse("NOT OK")


def profileView(request, username):
    user = User.objects.filter(username=username)

    if len(user) == 0:
        return HttpResponse(USER_NOT_FOUND)

    return HttpResponse(user)
