from django.contrib import admin
from .models import (
    Hotel, Facility, HotelPhoto, Room, RoomPhoto, Room_animates,
    Review, Details
)

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('hotel_name', 'city', 'star_rating', 'country')
    search_fields = ('hotel_name', 'city', 'country')
    list_filter = ('star_rating', 'country', 'parking')
    filter_horizontal = ('facilities',)

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('facility_name',)
    search_fields = ('facility_name',)

@admin.register(HotelPhoto)
class HotelPhotoAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'image')

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'hotel', 'price_per_night', 'available_rooms')
    search_fields = ('name', 'hotel__hotel_name')
    list_filter = ('hotel',)
    filter_horizontal = ('animations',)

@admin.register(RoomPhoto)
class RoomPhotoAdmin(admin.ModelAdmin):
    list_display = ('room', 'image')

@admin.register(Room_animates)
class RoomAnimatesAdmin(admin.ModelAdmin):
    list_display = ('animation_name',)
    search_fields = ('animation_name',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'user', 'rating', 'created_at')
    search_fields = ('hotel__hotel_name', 'user__username')
    list_filter = ('rating', 'created_at')

@admin.register(Details)
class DetailsAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'allow_children', 'allow_pets', 'visa', 'cash_on_delivery')
