from django.db import models
from django.core.validators import *

from users.models import Users


#table of menzas
class Diners(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)


#table of dishes
class Dishes(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)


#table of soups
class Soups(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)


#table of all menza menus, new inserts every day
class Menus(models.Model):
    diner = models.ForeignKey(Diners, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dishes, on_delete=models.CASCADE)
    soup = models.ForeignKey(Soups, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)


#table of orders, connecting menza menus to users
class Orders(models.Model):
    menu = models.ForeignKey(Menus, on_delete=models.CASCADE)
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)


#table of reviews
class Reviews(models.Model):
    comment = models.CharField(max_length=200)
    grade = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    order = models.OneToOneField(Orders, on_delete=models.CASCADE)