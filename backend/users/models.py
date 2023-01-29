from django.db import models
from django.contrib.auth.models import User as DefaultUser
import menzaDatabase.models


# Create your models here.

class User(DefaultUser):

    def order(self, menu):
        order = menzaDatabase.models.Order(menu=menu, user=self)
        order.save()

    def review(self, order, grade, comment):
        review = menzaDatabase.models.Review(
            order=order, grade=grade, comment=comment)
        review.save()
