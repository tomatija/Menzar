from rest_framework import serializers

from .models import *

class Diner_serializer (serializers.ModelSerializer):
    class Meta:
        model = Diner
        fields = '__all__'

class Dish_serializer (serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class Soup_serializer (serializers.ModelSerializer):
    class Meta:
        model = Soup
        fields = '__all__'


class Menu_serializer (serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'

class Order_serializer (serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class Review_serializer (serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'