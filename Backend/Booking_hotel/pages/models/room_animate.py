from django.db import models
class Room_animates(models.Model):
    id = models.AutoField(primary_key=True)
    ANIMATION_CHOICES = [
        ('Clothes Rack', 'Clothes Rack'),
        ('Flat Screen TV', 'Flat Screen TV'),
        ('Air Conditioning', 'Air Conditioning'),
        ('Desk', 'Desk'),
        ('Wake Up Service', 'Wake Up Service'),
        ('Towels', 'Towels'),
        ('Wardrobe or Closet', 'Wardrobe or Closet'),
        ('Heating', 'Heating'),
        ('Fan', 'Fan'),
        ('Safety Deposit Box', 'Safety Deposit Box'),
        ('Extra Towels Fee', 'Extra Towels Fee'),
        ('Ground Floor Unit', 'Ground Floor Unit'),
    ]

    animation_name = models.CharField(max_length=100, choices= ANIMATION_CHOICES)
    def __str__(self):
        return self.get_animation_name_display()
