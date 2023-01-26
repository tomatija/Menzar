from django.db import models

# Create your models here.

class user(models.Model):
    login_name = models.CharField(max_length=50, default="example_name")
    display_name = models.CharField(max_length=50, default="example_name")
    password = models.CharField(max_length=50, default="password")
    email = models.CharField(max_length=100, default="email")