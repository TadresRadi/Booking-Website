
from rest_framework import serializers

from pages.models.hotel_image import *
from pages.models.room_animate import *
from pages.models.room_image import *


class HotelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelPhoto
        fields = ['id', 'image','hotel']  
 
        
class RoomAnimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_animates
        fields = ['id', 'animation_name']



class RoomPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomPhoto
        fields = ['id', 'image', 'room']


class HotelImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = HotelPhoto
        fields = ['image']
