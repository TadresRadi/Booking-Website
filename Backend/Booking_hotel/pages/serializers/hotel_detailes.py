from rest_framework import serializers
from pages.serializers.images import HotelPhotoSerializer 
from pages. serializers.room import RoomSerializer
from pages.serializers.review import ReviewSerializer
from pages.serializers.detailes import DetailsSerializer

from pages. serializers.facility import FacilitySerializer
from pages.models.hotel import Hotel


class HotelDetailSerializer(serializers.ModelSerializer):
    hotel_images = HotelPhotoSerializer(many=True, read_only=True)
    rooms = RoomSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    details = DetailsSerializer(read_only=True)
    facilities = FacilitySerializer(many=True, read_only=True)
    

    class Meta:
        model = Hotel
        fields = [
            'id', 'hotel_name', 'location', 'description', 'star_rating',
            'country', 'city', 'street_address', 'postal_code', 'parking',
            'created_at', 'latitude', 'longitude',
            'facilities', 'hotel_images', 'rooms', 'reviews', 'details'
        ]
        read_only_fields = ['owner']
    

   
