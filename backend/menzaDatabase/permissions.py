from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from users.models import DinerUser
from menzaDatabase.models import Dish, Soup

dinerOwnerGroup, created = Group.objects.get_or_create(name='DinerOwner')

content_types = [ContentType.objects.get_for_model(model) for model in [
    DinerUser, Dish, Soup]]

post_permissions = [Permission.objects.filter(
    content_type=content_type) for content_type in content_types]

for post_permission in post_permissions:
    for perm in post_permission:
        if perm.codename in ['add_soup', 'add_dish', 'change_dish', 'change_soup', 'add_menu', 'change_menu']:
            dinerOwnerGroup.permissions.add(perm)
