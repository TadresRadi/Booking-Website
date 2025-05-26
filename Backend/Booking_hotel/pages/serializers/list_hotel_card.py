
from rest_framework import serializers
from collections import Counter

from pages.models.hotel import Hotel
from pages.serializers.images import HotelImageSerializer
from pages.serializers.room import RoomSerializer



# Hotel Serializer
class HotelSerializer(serializers.ModelSerializer):
    rooms = RoomSerializer(many=True, read_only=True)
    hotel_images = HotelImageSerializer(many=True, read_only=True)
    reviews_count = serializers.SerializerMethodField()
    largest_rating_percentage = serializers.SerializerMethodField()
    largest_rating_category = serializers.SerializerMethodField()
    facilities = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [ 'id','hotel_name', 'location', 'star_rating', 
                  'rooms', 'hotel_images', 'reviews_count',
                  'largest_rating_percentage', 'largest_rating_category',
                  'facilities','description',
                  'country','city','street_address','postal_code', 
                  'check_in_from','check_in_until','check_out_from',
                  'check_out_until','parking', 'created_at','latitude', 'longitude','main_image']
        read_only_fields = ['location']
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

