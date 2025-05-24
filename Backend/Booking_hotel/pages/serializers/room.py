
from rest_framework import serializers

from pages.serializers.images import RoomAnimateSerializer, RoomPhotoSerializer
from pages.models.room import  Room
from pages.models.hotel import Hotel



class RoomSerializer(serializers.ModelSerializer):
    images = RoomPhotoSerializer(source='roomphoto_set', many=True, read_only=True)
    animations = RoomAnimateSerializer(many=True, read_only=True) # <-- add this line
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    class Meta:
        model = Room
        fields = [
            'id', 'name', 'price_per_night', 'available_rooms', 
            'adult_capacity', 'room_size', 'images', 'animations','hotel'  # <-- include it here
        ]
