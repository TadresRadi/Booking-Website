from django.db import models

class Facility(models.Model):

    name = models.CharField(max_length=100, unique=True)

    def _str_(self):
        return self.name

class Hotel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    check_in_from = models.TimeField()
    check_in_until = models.TimeField()
    check_out_from = models.TimeField()
    check_out_until = models.TimeField()
    serves_breakfast = models.BooleanField(default=False)

    PARKING_CHOICES = [
        ('free', 'Yes, free'),
        ('paid', 'Yes, paid'),
        ('no', 'No'),
    ]
    parking = models.CharField(max_length=10, choices=PARKING_CHOICES, default='no')

    facilities = models.ManyToManyField(Facility, related_name='hotels')

    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.name


class Room(models.Model):
    ROOM_VIEW_CHOICES = [
        ('balcony', 'Balcony'),
        ('terrace', 'Terrace'),
        ('view', 'View'),
    ]

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=100)
    minimum_rate = models.DecimalField(max_digits=10, decimal_places=2)
    room_size = models.CharField(max_length=50)
    number_of_bathrooms = models.PositiveIntegerField()
    outdoor_view = models.CharField(max_length=10, choices=ROOM_VIEW_CHOICES)

    features = models.ManyToManyField(Feature, related_name='rooms')

    def _str_(self):
        return f"{self.name} ({self.hotel.name})"

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

class HotelPhoto(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='hotel_photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Photo for {self.hotel.name}"

class RoomPhoto(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='room_photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Photo for {self.room.name} ({self.room.hotel.name})