
from django.db import models
from .hotel import Hotel
# hotel image
class HotelPhoto(models.Model):
    hotel = models.ForeignKey(Hotel, related_name="hotel_images",on_delete=models.CASCADE)
    image = models.ImageField( upload_to='hotel_images/' ,height_field=None, width_field=None, max_length=None, null=True, blank=True)
    def __str__(self):
        return f"Photo for {self.hotel.hotel_name}"
