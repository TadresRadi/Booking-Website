from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Hotel, Facility, HotelPhoto, Room, Room_animates, RoomPhoto, Details

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

# Facility serializer
class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ['id', 'facility_name']


# Hotel photo serializer
class HotelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelPhoto
        fields = ['id', 'hotel', 'image']


# Hotel serializer
class HotelSerializer(serializers.ModelSerializer):
    facilities = serializers.PrimaryKeyRelatedField(queryset=Facility.objects.all(), many=True)
    hotel_images = HotelPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Hotel
        fields = [
            'id',
            'hotel_name',
            # 'location',
            'description',
            'star_rating',
            'country',
            'city',
            'street_address',
            'postal_code',
            'check_in_from',
            'check_in_until',
            'check_out_from',
            'check_out_until',
            'parking',
            'created_at',
            'facilities',
            'hotel_images'
        ]


# Room features (Room_animates) serializer
class RoomAnimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_animates
        fields = ['id', 'animation_name']


# Room serializer
class RoomSerializer(serializers.ModelSerializer):
    room_facilities = serializers.PrimaryKeyRelatedField(queryset=Room_animates.objects.all(), many=True)

    class Meta:
        model = Room
        fields = [
            'id',
            'hotel',
            'name',
            'price_per_night',
            'available_rooms',
            'adult_capacity',
            'room_size',
            'room_facilities'
        ]


# Room photo serializer
class RoomPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomPhoto
        fields = ['id', 'room', 'image']


# Hotel payment & policy details
class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = [
            'id',
            'visa',
            'mastercard',
            'meeza_card',
            'cash_on_delivery',
            'etsalat_cash',
            'aman_payment',
            'orange_cash',
            'vodafone_cash',
            'fawny_pay',
            'allow_children',
            'allow_pets'
        ]
