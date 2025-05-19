from django.contrib import admin

# Register your models here.
from .models import Details, Hotel, HotelPhoto, Room, RoomPhoto,Review , Facility, Room_animates

admin.site.register(Hotel)
admin.site.register(Room)
admin.site.register(Facility)
admin.site.register(RoomPhoto)
admin.site.register(HotelPhoto)
admin.site.register(Review)
admin.site.register(Room_animates)
admin.site.register(Details)


