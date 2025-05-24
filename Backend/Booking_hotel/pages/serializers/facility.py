from rest_framework import serializers
from pages.models.hotel import Hotel
from pages.models.facility import Facility
class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'

class FacilitiesSerializer(serializers.ModelSerializer):
    facility_name = serializers.CharField(source='get_facility_name_display')

    class Meta:
        model = Hotel
        fields = ['facility_name']
   
    def get_facilities(self, obj):
        return [f.get_facility_name_display() for f in obj.facility_name.all()]

