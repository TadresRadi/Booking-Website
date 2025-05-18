from django.db import models
from django.contrib.auth.models import User


class Facility (models.Model):
    id = models.AutoField(primary_key=True)
    FACILITY_CHOICES = [
        ('wifi', 'WiFi'),
        ('parking', 'Parking'),
        ('pool', 'Pool'),
        ('gym', 'Gym'),
        ('spa', 'Spa'),
        ('restaurant', 'Restaurant'),
        ('bar', 'Bar'),
        ('room_service', 'Room Service'),
        ('laundry', 'Laundry'),
        ('business_center', 'Business Center'),
        ('conference_room', 'Conference Room'),
        ('pet_friendly', 'Pet Friendly'),
        ('airport_shuttle', 'Airport Shuttle'),
        ('beach_access', 'Beach Access'),
        ('family_friendly', 'Family Friendly'),
        ('non_smoking_rooms', 'Non Smoking Rooms')
    ]
    facility_name = models.CharField(max_length=100, choices = FACILITY_CHOICES )

    






class Hotel(models.Model):
    id = models.AutoField(primary_key=True)
    hotel_name = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=300, null=True)
    description = models.TextField(null=True)
    star_rating = models.IntegerField(null=True)  # Remove max_length, not valid on IntegerField
    country = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=100, null=True)
    street_address = models.CharField(max_length=255, null=True)
    postal_code = models.CharField(max_length=20, null=True)
    check_in_from = models.TimeField(default='14:00')
    check_in_until = models.TimeField(default='14:00')
    check_out_from = models.TimeField(default='14:00')
    check_out_until = models.TimeField(default='14:00')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
   

    PARKING_CHOICES = [
        ('free', 'Yes, free'),
        ('paid', 'Yes, paid'),
        ('no', 'No'),
    ]
    parking = models.CharField(max_length=10, choices=PARKING_CHOICES, default='no')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    facilities = models.ManyToManyField(Facility, related_name='hotels')

    def _str_(self):
        return self.hotel_name or "Unnamed Hotel"

class HotelPhoto(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='hotel_images')
    image = models.ImageField(upload_to='hotel_images/')
    

    def _str_(self):
        return f"{self.hotel.hotel_name} Photo"

class Room_animates(models.Model):
    id = models.AutoField(primary_key=True)

    ANIMATION_CHOICES = [
        ('swimming', 'Swimming'),
        ('dancing', 'Dancing'),
        ('singing', 'Singing'),
        ('yoga', 'Yoga'),
        ('cooking', 'Cooking'),
        ('painting', 'Painting'),
        ('crafting', 'Crafting'),
        ('gaming', 'Gaming'),
        ('sports', 'Sports'),
        ('photography', 'Photography'),
        ('music', 'Music'),
        ('theater', 'Theater'),
        ('comedy', 'Comedy'),
        ('magic', 'Magic'),
        ('storytelling', 'Storytelling'),
        ('workshops', 'Workshops'),
        ('fitness', 'Fitness'),
        ('meditation', 'Meditation'),
        ('adventure', 'Adventure'),
        ('exploration', 'Exploration'),
        ('cultural', 'Cultural'),
        ('nature', 'Nature'),
        ('wellness', 'Wellness'),
        ('relaxation', 'Relaxation'),
       
    ]
    animation_name = models.CharField(max_length=100, choices= ANIMATION_CHOICES)


class Room (models.Model):    
    hotel = models.ForeignKey(Hotel, related_name='rooms', on_delete=models.CASCADE)
    
    ROOM_VIEW_CHOICES = [
        ('balcony', 'Balcony'),
        ('terrace', 'Terrace'),
        ('view', 'View'),
    ]
    name = models.CharField(max_length=100,null=True)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    available_rooms = models.IntegerField(null=True)
    adult_capacity = models.IntegerField(null=True)
    room_size = models.CharField(max_length=50 ,null=True)
    animations = models.ManyToManyField(Room_animates, blank=True)

class RoomPhoto(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='room_images/')

    def __str__(self):
        return f"Image for {self.room.name}"

class Review(models.Model):
    hotel = models.ForeignKey('Hotel', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('hotel', 'user')  

    def _str_(self):
        return f"{self.user.username} review on {self.hotel.hotel_name}"
    

class Details(models.Model):
    hotel = models.OneToOneField(Hotel, on_delete=models.CASCADE, related_name='details')

    visa = models.BooleanField(default=False)
    mastercard = models.BooleanField(default=False)
    meeza_card = models.BooleanField(default=False)
    cash_on_delivery = models.BooleanField(default=False)
    etsalat_cash = models.BooleanField(default=False)
    aman_payment = models.BooleanField(default=False)
    orange_cash = models.BooleanField(default=False)
    vodafone_cash = models.BooleanField(default=False)
    fawny_pay = models.BooleanField(default=False)

    allow_children = models.BooleanField(default=False)
    allow_pets = models.BooleanField(default=False)

    def _str_(self):
        return f"Details for {self.hotel.name}"