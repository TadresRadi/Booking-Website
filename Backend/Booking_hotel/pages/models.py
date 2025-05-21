from django.db import models
from django.contrib.auth.models import User

# facilites for every hotel 
class Facility (models.Model):
    id = models.AutoField(primary_key=True)
    FACILITY_CHOICES = [
       ('restaurant', 'Restaurant'),
        ('room_service', 'Room service'),
        ('spa', 'Spa and wellness centre'),
        ('fitness_centre', 'Fitness Centre'),
        ('garden', 'Garden'),
        ('terrace', 'Terrace'),
        ('non_smoking_rooms', 'Non-smoking rooms'),
        ('airport_shuttle', 'Airport shuttle'),
        ('family_rooms', 'Family rooms'),
        ('hot_tub', 'Hot tub/Jacuzzi'),
        ('free_wifi', 'Free WiFi'),
        ('air_conditioning', 'Air conditioning'),
        ('water_park', 'Water Park'),
        ('ev_charging', 'Electric vehicle charging station'),
        ('swimming_pool', 'Swimming pool'),
        ('beach', 'Beach'),
        ('electric_kettle', 'Electric Kettle'),
        ('tea_coffee_maker', 'Tea/Coffee maker'),
        ('dining_area', 'Dining area'),
        ('microwave', 'Microwave'),
    ]
    facility_name = models.CharField(max_length=100, choices = FACILITY_CHOICES )
    def __str__(self):
        return self.get_facility_name_display()

    
# hotel model to store hotel information
class Hotel (models.Model):
    id = models.AutoField(primary_key=True)
    hotel_name = models.CharField(max_length=100)
    location = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    star_rating = models.IntegerField()
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    check_in_from = models.TimeField()
    check_in_until = models.TimeField()
    check_out_from = models.TimeField()
    check_out_until = models.TimeField()

    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    PARKING_CHOICES = [
        ('free', 'Yes, free'),
        ('paid', 'Yes, paid'),
        ('no', 'No'),
    ]
    parking = models.CharField(max_length=10, choices=PARKING_CHOICES, default='no')

    created_at = models.DateTimeField(auto_now_add=True)

    # Relations
    facilities = models.ManyToManyField(Facility, related_name='hotels')
    def save(self, *args, **kwargs):
        self.location = f"{self.street_address}, {self.city}, {self.postal_code}, {self.country}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.hotel_name
        

# hotel image
class HotelPhoto(models.Model):
    hotel = models.ForeignKey(Hotel, related_name="hotel_images",on_delete=models.CASCADE)
    image = models.ImageField( upload_to='hotel_images/' ,height_field=None, width_field=None, max_length=None, null=True, blank=True)
    def __str__(self):
        return f"Photo for {self.hotel.hotel_name}"

class Room_animates(models.Model):
    id = models.AutoField(primary_key=True)

    ANIMATION_CHOICES = [
      ('clothes_rack', 'Clothes Rack'),
        ('flat_screen_tv', 'Flat Screen TV'),
        ('air_conditioning', 'Air Conditioning'),
        ('desk', 'Desk'),
        ('wake_up_service', 'Wake Up Service'),
        ('towels', 'Towels'),
        ('wardrobe_or_closet', 'Wardrobe or Closet'),
        ('heating', 'Heating'),
        ('fan', 'Fan'),
        ('safety_deposit_box', 'Safety Deposit Box'),
        ('extra_towels_fee', 'Extra Towels Fee'),
        ('ground_floor_unit', 'Ground Floor Unit'),
       
    ]
    animation_name = models.CharField(max_length=100, choices= ANIMATION_CHOICES)
    def __str__(self):
        return self.get_animation_name_display()

# room model to store room information
class Room (models.Model):    
    hotel = models.ForeignKey(Hotel, related_name='rooms', on_delete=models.CASCADE)
    
    ROOM_VIEW_CHOICES = [
        ('balcony', 'Balcony'),
        ('terrace', 'Terrace'),
        ('view', 'View'),
    ]
    name = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    available_rooms = models.IntegerField()
    adult_capacity = models.IntegerField()
    room_size = models.CharField(max_length=50)
    room_facilities = models.ManyToManyField(Room_animates, related_name='rooms')

    def __str__(self):
        return f"{self.hotel.hotel_name} - {self.name}"



class RoomPhoto(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='room_images/')

    def __str__(self):
        return f"Image for {self.room.name}"

# review model to store user reviews for hotels 
class Review(models.Model):
    hotel = models.ForeignKey('Hotel', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField() # Example: 1 to 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.room.name}"


