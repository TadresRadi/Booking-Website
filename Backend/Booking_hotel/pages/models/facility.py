from django.db import models

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
