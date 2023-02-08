from rest_framework import serializers

from .models import *

class Diner_serializer (serializers.ModelSerializer):
    class Meta:
        models = Diner
        fields = '__all__'

class Dish_serializer (serializers.ModelSerializer):
    class Meta:
        models = Dish
        fields = '__all__'

class Soup_serializer (serializers.ModelSerializer):
    class Meta:
        models = Soup
        fields = '__all__'


class Menu_serializer (serializers.ModelSerializer):
    class Meta:
        models = Menu
        fields = '__all__'

class Order_serializer (serializers.ModelSerializer):
    class Meta:
        models = Order
        fields = '__all__'

class Review_serializer (serializers.ModelSerializer):
    class Meta:
        models = Review
        fields = '__all__'