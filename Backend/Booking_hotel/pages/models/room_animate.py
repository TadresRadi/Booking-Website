from django.db import models
class Room_animates(models.Model):
    id = models.AutoField(primary_key=True)

    ANIMATION_CHOICES = [
      ('clothes_rack', 'Clothes Rack'),
        ('flat_screen_tv', 'Flat Screen TV'),
        ('air_conditioning', 'Air Conditioning'),
        ('desk', 'Desk'),
        ('wake_up_service', 'Wake Up Service'),
        ('towels', 'Towels'),
        ('wardrobe_or_closet', 'Wardrobe or Closet'),
        ('heating', 'Heating'),
        ('fan', 'Fan'),
        ('safety_deposit_box', 'Safety Deposit Box'),
        ('extra_towels_fee', 'Extra Towels Fee'),
        ('ground_floor_unit', 'Ground Floor Unit'),
       
    ]
    animation_name = models.CharField(max_length=100, choices= ANIMATION_CHOICES)
    def __str__(self):
        return self.get_animation_name_display()
