from django.db import models

from .facility import Facility


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
    check_in_from = models.TimeField()
    check_in_until = models.TimeField()
    check_out_from = models.TimeField()
    check_out_until = models.TimeField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    main_image = models.ImageField(upload_to='hotel_main_images/', null=True, blank=True)

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
        