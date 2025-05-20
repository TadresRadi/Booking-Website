from collections import Counter
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Facility, Hotel, HotelPhoto, Review, Room
from .models import  Room_animates, RoomPhoto



# User Registration Serializer
from .models import Hotel, Room, Facility, Room_animates, RoomPhoto, HotelPhoto, Review, Details

from .models import RoomPhoto


class HotelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelPhoto
        fields = ['id','hotel', 'image']  

        
class RoomAnimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room_animates
        fields = ['id', 'animation_name']




class RoomPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomPhoto
        fields = ['id', 'room','image']


class RoomSerializer(serializers.ModelSerializer):
    images = RoomPhotoSerializer(source='roomphoto_set', many=True, read_only=True)
    animations = RoomAnimateSerializer(many=True, read_only=True)  # <-- add this line
    room_facilities = serializers.PrimaryKeyRelatedField(queryset=Room_animates.objects.all(), many=True)

    class Meta:
        model = Room
        fields = [
            'id', 'hotel', 'name', 'price_per_night', 'available_rooms','room_facilities' 
            'adult_capacity', 'room_size', 'images', 'animations'  # <-- include it here
        ]

    def create(self, validated_data):
        room_facilities = validated_data.pop('room_facilities', [])
       room = Room.objects.create(**validated_data)
       room.room_facilities.set(room_facilities)
     return room

   def update(self, instance, validated_data):
      room_facilities = validated_data.pop('room_facilities', None)
     for attr, value in validated_data.items():
        setattr(instance, attr, value)
     instance.save()
     if room_facilities is not None:
        instance.room_facilities.set(room_facilities)
     return instance


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)  # overwrite user field

    class Meta:
        model = Review
        fields = ['id', 'user', 'comment', 'rating', 'created_at']


class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ['id', 'facility_name']



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


# User Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data.get('username'), password=data.get('password'))
        user = authenticate(
            username=data.get('username'),
            password=data.get('password')
        )
        if not user:
            raise serializers.ValidationError("Invalid username or password")
        return {'user': user, 'username': user.username}
          

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


# Room Serializer for hotel card
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['name', 'price_per_night', 'available_rooms', 'adult_capacity']


# Hotel Image Serializer for hotel card
class HotelImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = HotelPhoto
        fields = ['image']


# Review Serializer for hotel 
class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')

    class Meta:
        model = Review
        fields = ['user', 'rating', 'comment']


# Hotel Serializer
class HotelSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)
    hotel_images = HotelImageSerializer(many=True, read_only=True)
    reviews_count = serializers.SerializerMethodField()
    largest_rating_percentage = serializers.SerializerMethodField()
    largest_rating_category = serializers.SerializerMethodField()
    facilities = serializers.SerializerMethodField()
    
    facilities = serializers.PrimaryKeyRelatedField(queryset=Facility.objects.all(), many=True)
    hotel_images = HotelPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Hotel
        fields = [ 'id','hotel_name', 'location', 'star_rating', 
                  'rooms', 'hotel_images', 'reviews_count',
                  'largest_rating_percentage', 'largest_rating_category','facilities','description','country',
            'city',
            'street_address',
            'postal_code', 'check_in_from',
            'check_in_until',
            'check_out_from',
            'check_out_until','parking',
            'created_at','latitude',
            'longitude']

      
           
           
            
    def get_facilities(self, obj):
        return [f.get_facility_name_display() for f in obj.facilities.all()]


    def get_reviews_count(self, obj):
        return obj.reviews.count()

    def get_largest_rating_percentage(self, obj):
        reviews = obj.reviews.all()
        total = reviews.count()
        if total == 0:
            return 0
        categories = [self.get_category_label(r.rating) for r in reviews]
        count = Counter(categories)
        _, largest_count = count.most_common(1)[0]
        return round((largest_count / total) * 100, 1)

    def get_largest_rating_category(self, obj):
        reviews = obj.reviews.all()
        if not reviews.exists():
            return None
        categories = [self.get_category_label(r.rating) for r in reviews]
        count = Counter(categories)
        largest_cat, _ = count.most_common(1)[0]
        return largest_cat

    def get_category_label(self, rating):
        return {
            5: "Excellent",
            4: "Good",
            3: "Nice",
            2: "Poor",
            1: "Bad"
        }.get(rating, "Unknown")

   def create(self, validated_data):
        facilities = validated_data.pop('facilities', [])
        hotel = Hotel.objects.create(**validated_data)
        hotel.facilities.set(facilities)  
        return hotel

   def update(self, instance, validated_data):
        facilities = validated_data.pop('facilities', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if facilities is not None:
            instance.facilities.set(facilities)
        return instance


# Facilities Serializer
class FacilitiesSerializer(serializers.ModelSerializer):
    facility_name = serializers.CharField(source='get_facility_name_display')

    class Meta:
        model = Hotel
        fields = ['facility_name']
   
    def get_facilities(self, obj):
        return [f.get_facility_name_display() for f in obj.facility_name.all()]


# rooom animate serializer
class RoomAnimatesSerializer(serializers.ModelSerializer):
    animation_name = serializers.CharField()

    class Meta:
        model = Room
        fields = ['animation_name']
       

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
            'country', 'city', 'street_address', 'postal_code', 'parking',
            'created_at', 'latitude', 'longitude',
            'facilities', 'hotel_images', 'rooms', 'reviews', 'details'
        ]


