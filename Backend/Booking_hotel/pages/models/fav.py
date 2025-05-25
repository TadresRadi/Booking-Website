# models.py
from django.db import models
from django.contrib.auth.models import User
from pages.models.hotel import Hotel


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_hotels')
    
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='favorited_by')
    
    class Meta:
        unique_together = ('user', 'hotel')

  