from rest_framework import serializers
from pages.models.detailes import Details
class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'
