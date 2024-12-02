from django.db import models
from django.contrib.auth.models import AbstractUser


class DinerUser(AbstractUser):
    dinerOwner = models.CharField(max_length=50, null=True, blank=True)
