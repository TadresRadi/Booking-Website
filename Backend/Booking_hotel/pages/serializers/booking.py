# booking/serializers.py
from rest_framework import serializers
from pages.models.booking import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user']  # user is read-only and set by the server
