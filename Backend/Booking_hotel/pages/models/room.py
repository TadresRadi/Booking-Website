from django.db import models
from .hotel import Hotel
from .room_animate import Room_animates  


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
    animations = models.ManyToManyField(Room_animates, blank=True)
    def __str__(self):
        return f"{self.hotel.hotel_name} - {self.name}"

