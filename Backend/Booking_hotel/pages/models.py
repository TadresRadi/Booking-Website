from django.db import models
from django.contrib.auth.models import User

# facilites for every hotel 
class Facility (models.Model):
    id = models.AutoField(primary_key=True)
    FACILITY_CHOICES = [
        ('wifi', 'WiFi'),
        ('Parking', 'Parking'),
        ('Pool', 'Pool'),
        ('Gym', 'Gym'),
        ('Spa', 'Spa'),
        ('Restaurant', 'Restaurant'),
        ('Bar', 'Bar'),
        ('Room Service', 'Room Service'),
        ('Laundry', 'Laundry'),
        ('Business Center', 'Business Center'),
        ('Conference Room', 'Conference Room'),
        ('Pet Friendly', 'Pet Friendly'),
        ('Airport shuttle', 'Airport Shuttle'),
        ('Beach Access', 'Beach Access'),
        ('Family Friendly', 'Family Friendly'),
        ('Non Smoking Rooms', 'Non Smoking Rooms')
    ]
    facility_name = models.CharField(max_length=100, choices = FACILITY_CHOICES )

    
# hotel model to store hotel information
class Hotel (models.Model):
    id = models.AutoField(primary_key=True)
    hotel_name = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    description = models.TextField()
    star_rating = models.IntegerField()
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    # check_in_from = models.TimeField()
    # check_in_until = models.TimeField()
    # check_out_from = models.TimeField()
    # check_out_until = models.TimeField()
    PARKING_CHOICES = [
        ('free', 'Yes, free'),
        ('paid', 'Yes, paid'),
        ('no', 'No'),
    ]
    parking = models.CharField(max_length=10, choices=PARKING_CHOICES, default='no')
    created_at = models.DateTimeField(auto_now_add=True)
    facilities = models.ManyToManyField(Facility, related_name='hotels')
    def __str__(self):
        return self.hotel_name

# hotel image
class HotelPhoto(models.Model):
    hotel = models.ForeignKey(Hotel, related_name="hotel_images",on_delete=models.CASCADE)
    image = models.ImageField( upload_to='hotel_images/' ,height_field=None, width_field=None, max_length=None, null=True, blank=True)

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
    image = models.ImageField(upload_to='room_images/')

    def __str__(self):
        return f"Image for {self.room.name}"


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