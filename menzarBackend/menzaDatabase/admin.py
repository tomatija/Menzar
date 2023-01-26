from django.contrib import admin

from .models import * 
# Register your models here.


#TODO: change which models can the admin see (only menza_type ???)
admin.site.register(menza_type)
admin.site.register(dish_type)
admin.site.register(soup_type)
admin.site.register(menza_menu)
admin.site.register(order)
admin.site.register(review)