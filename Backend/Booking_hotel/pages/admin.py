from django.contrib import admin

# Register your models here.
from .models import Hotel, Room, Facilities, HotelFacilities, RoomImage, HotelImage

admin.site.register(Hotel)
admin.site.register(Room)
admin.site.register(Facilities)
admin.site.register(HotelFacilities)
admin.site.register(RoomImage)
admin.site.register(HotelImage)
    