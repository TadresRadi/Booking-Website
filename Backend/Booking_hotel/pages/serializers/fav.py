# داخل fav.py

from rest_framework import serializers
from pages.models.fav import Favorite
from pages.models.hotel import Hotel
from pages.serializers.list_hotel_card import HotelSerializer


class FavoriteHotelSerializer(serializers.ModelSerializer):
    hotel = serializers.SerializerMethodField()

    class Meta:
        model = Favorite
        fields = ['id', 'hotel']

    def get_hotel(self, obj):
        request = self.context.get('request')
        serializer = HotelSerializer(obj.hotel, context={'request': request})
        return serializer.data


class FavoriteHotelInputSerializer(serializers.Serializer):
    hotel_id = serializers.IntegerField()
