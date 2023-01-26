from django.contrib import admin

from .models import *

# Register your models here.
# TODO: change which models can the admin see (only menza_type ???)
admin.site.register(Diners)
admin.site.register(Dishes)
admin.site.register(Soups)
admin.site.register(Menus)
admin.site.register(Orders)
admin.site.register(Reviews)
