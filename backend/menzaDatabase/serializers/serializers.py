from datetime import datetime
from rest_framework import serializers
from ..models import Diner, Dish, Soup, Menu, Review, Order, User


class DinerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diner
        fields = ['name', 'display_name']
        depth = 1


class SoupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soup
        fields = ['name']


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['name']


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['pk', 'diner', 'dish', 'soup', 'date']
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username']


class OrderSerializer(serializers.ModelSerializer):
    review = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True,
        allow_null=True
    )

    class Meta:
        model = Order
        fields = ['pk', 'menu', 'review']
        depth = 2


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = ['rating', 'comment', 'orders']
        depth = 2
