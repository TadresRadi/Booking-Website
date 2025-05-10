from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=255, unique=True)

    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)

    check_in_from = models.TimeField()
    check_in_until = models.TimeField()
    check_out_from = models.TimeField()
    check_out_until = models.TimeField()

    restaurant = models.BooleanField(default=False)
    room_service = models.BooleanField(default=False)
    sauna = models.BooleanField(default=False)
    fitness_centre = models.BooleanField(default=False)
    garden = models.BooleanField(default=False)
    terrace = models.BooleanField(default=False)
    non_smoking_rooms = models.BooleanField(default=False)
    airport_shuttle = models.BooleanField(default=False)
    family_rooms = models.BooleanField(default=False)
    spa = models.BooleanField(default=False)
    jacuzzi = models.BooleanField(default=False)
    free_wifi = models.BooleanField(default=False)
    air_conditioning = models.BooleanField(default=False)
    water_park = models.BooleanField(default=False)
    ev_charging = models.BooleanField(default=False)
    swimming_pool = models.BooleanField(default=False)
    beach = models.BooleanField(default=False)
    electric_kettle = models.BooleanField(default=False)
    tea_coffee_maker = models.BooleanField(default=False)
    dining_area = models.BooleanField(default=False)
    microwave = models.BooleanField(default=False)

    serves_breakfast = models.BooleanField(default=False)

    PARKING_CHOICES = [
        ('free', 'Yes, free'),
        ('paid', 'Yes, paid'),
        ('no', 'No'),
    ]

    parking = models.CharField(max_length=10, choices=PARKING_CHOICES, default='no')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Room(models.Model):
    ROOM_VIEW_CHOICES = [
        ('balcony', 'Balcony'),
        ('terrace', 'Terrace'),
        ('view', 'View'),
    ]

    hotel = models.ForeignKey('Hotel', on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=100)
    minimum_rate = models.DecimalField(max_digits=10, decimal_places=2)
    room_size = models.CharField(max_length=50)
    number_of_bathrooms = models.PositiveIntegerField()
    outdoor_view = models.CharField(max_length=10, choices=ROOM_VIEW_CHOICES)

    # Room features
    clothes_rack = models.BooleanField(default=False)
    flat_screen_tv = models.BooleanField(default=False)
    air_conditioning = models.BooleanField(default=False)
    desk = models.BooleanField(default=False)
    wake_up_service = models.BooleanField(default=False)
    towels = models.BooleanField(default=False)
    wardrobe_or_closet = models.BooleanField(default=False)
    heating = models.BooleanField(default=False)
    fan = models.BooleanField(default=False)
    safety_deposit_box = models.BooleanField(default=False)
    extra_towels_fee = models.BooleanField(default=False)
    ground_floor_unit = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.hotel.name})"
    
class Details(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='details')

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

    def __str__(self):
        return f"Details for {self.hotel.name}"



class HotelPhoto(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='hotel_photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for {self.hotel.name}"
