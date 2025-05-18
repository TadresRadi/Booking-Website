from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Hotel, Room, Facility, Room_animates, RoomPhoto, HotelPhoto, Review, Details

from .models import RoomPhoto


class HotelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelPhoto
        fields = ['id', 'image']  
        
class RoomAnimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_animates
        fields = ['id', 'animation_name']



class RoomPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomPhoto
        fields = ['id', 'image']

class RoomSerializer(serializers.ModelSerializer):
    images = RoomPhotoSerializer(source='roomphoto_set', many=True, read_only=True)
    animations = RoomAnimateSerializer(many=True, read_only=True)  # <-- add this line

    class Meta:
        model = Room
        fields = [
            'id', 'name', 'price_per_night', 'available_rooms', 
            'adult_capacity', 'room_size', 'images', 'animations'  # <-- include it here
        ]

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = '__all__'


class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'



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
        base_username = f"{first_name}{last_name}"
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
        user = authenticate(
            username=data.get('username'),
            password=data.get('password')
        )
        if not user:
            raise serializers.ValidationError("Invalid username or password.")
        return {'user': user, 'username': user.username}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'hotel_name', 'location', 'star_rating', 'description']

    def create(self, validated_data):
        return Hotel.objects.create(**validated_data)



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
            'country', 'city', 'street_address', 'postal_code', 'check_in_from',
            'check_in_until', 'check_out_from', 'check_out_until', 'parking',
            'created_at', 'latitude', 'longitude',  # ✅ Add these
            'facilities', 'hotel_images', 'rooms', 'reviews', 'details'
        ]

