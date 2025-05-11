from django.db import models


# hotel model to store hotel information
class Hotel (models.Model):
    id = models.AutoField(primary_key=True)
    hotel_name = models.CharField(max_length=100)
    location = models.CharField(max_length=300)
    description = models.TextField()
    star_rating = models.IntegerField(max_length=5)

# hotel image
class HotelImage(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='hotel_images/')

# room model to store room information
class Room (models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    ROOM_TYPE =[
        ('single', 'Single'),
        ('double', 'Double'),
        ('suite', 'Suite'),
        ('deluxe', 'Deluxe'),
       
    ]
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    available_rooms = models.IntegerField()
    adult_capacity = models.IntegerField()
#room image
class RoomImage(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='room_images/')

# facilites for every hotel 
class Facilities (models.Model):
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

    
# // RELATION OF HOTELS AND FACILITIES
class HotelFacilities(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    facility = models.ForeignKey(Facilities, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('hotel', 'facility')

 # animates for every room
class Animations(models.Model):
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

# // RELATION OF ROOMS AND ANIMATIONS
class RoomAnimations(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    animation = models.ForeignKey(Animations, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('room', 'animation')


