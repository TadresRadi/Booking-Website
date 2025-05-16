from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Hotel, Facility, HotelPhoto, Room, Feature, RoomPhoto, Details


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    accept_terms = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'accept_terms']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate_accept_terms(self, value):
        if not value:
            raise serializers.ValidationError("You must accept the terms and policies.")
        return value

    def create(self, validated_data):
        validated_data.pop('accept_terms')

        
        first_name = validated_data['first_name'].strip().lower()
        last_name = validated_data['last_name'].strip().lower()
        base_username = f"{first_name} {last_name}"
        username = base_username
        counter = 1

        while User.objects.filter(username=username).exists():
           username = f"{base_username}{counter}"
           counter += 1

        user = User.objects.create_user(
            username=username,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Check if the credentials are correct
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password")

        return {
            'user': user,
            'username': username,
        }


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ['id', 'name']

class HotelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelPhoto
        fields = ['id','hotel', 'image', 'uploaded_at']

class HotelSerializer(serializers.ModelSerializer):
    facilities = serializers.PrimaryKeyRelatedField(queryset=Facility.objects.all(), many=True)
    photos = HotelPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Hotel
        fields = ['id', 'name','rating', 'country', 'city', 'street_address', 'postal_code',
                  'check_in_from', 'check_in_until', 'check_out_from', 'check_out_until',
                  'serves_breakfast', 'parking', 'facilities', 'photos', 'created_at']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'name']

class RoomSerializer(serializers.ModelSerializer):
    features = serializers.PrimaryKeyRelatedField(queryset=Feature.objects.all(), many=True)

    class Meta:
        model = Room
        fields = ['id', 'hotel', 'name', 'minimum_rate', 'room_size', 'number_of_bathrooms', 'outdoor_view',
                  'clothes_rack', 'flat_screen_tv', 'air_conditioning', 'desk', 'wake_up_service', 'towels',
                  'wardrobe_or_closet', 'heating', 'fan', 'safety_deposit_box', 'extra_towels_fee',
                  'ground_floor_unit', 'features']

class RoomPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomPhoto
        fields = ['id', 'room', 'image', 'uploaded_at']

class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = ['id', 'visa', 'mastercard', 'meeza_card', 'cash_on_delivery', 'etsalat_cash',
                  'aman_payment', 'orange_cash', 'vodafone_cash', 'fawny_pay', 'allow_children', 'allow_pets']
