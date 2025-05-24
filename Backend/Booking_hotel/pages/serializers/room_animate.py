from rest_framework import serializers
from pages.models.room_animate import Room_animates
from pages.models.hotel import Hotel
class RoomAnimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_animates
        fields = ['id', 'animation_name']

    def create(self, validated_data):
        return Hotel.objects.create(**validated_data)
