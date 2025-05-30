
from rest_framework import serializers
from pages.models.fav import Favorite
from pages.models.hotel import Hotel
from pages. serializers.list_hotel_card import HotelSerializer


class FavoriteHotelSerializer(serializers.ModelSerializer):
    hotel = HotelSerializer()

    class Meta:
        model = Favorite
        fields = ['id', 'hotel']
        
        

class FavoriteHotelInputSerializer(serializers.Serializer):
    hotel_id = serializers.IntegerField()