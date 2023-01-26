from django.db import models
from django.core.validators import *

from users.models import user as U

#table of menzas
class menza_type(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

#table of dishes
class dish_type(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

#table of soups
class soup_type(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)

#table of all menza menus, new inserts every day
class menza_menu(models.Model):
    id_menza = models.ForeignKey(menza_type, on_delete=models.CASCADE)
    id_dish = models.ForeignKey(dish_type, on_delete=models.CASCADE)
    id_soup = models.ForeignKey(soup_type, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)


#table of orders, connecting menza menus to users
class order(models.Model):
    id_menza_menu = models.ForeignKey(menza_menu, on_delete=models.CASCADE)
    user = models.ForeignKey(U, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

class review(models.Model):
    comment = models.CharField(max_length=200)
    grade = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(1), MaxValueValidator(5)])
    id_order = models.ForeignKey(order, on_delete=models.CASCADE)