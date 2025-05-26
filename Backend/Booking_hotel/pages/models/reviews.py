from django.db import models
from django.contrib.auth.models import User
# review model to store user reviews for hotels 
class Review(models.Model):
    hotel = models.ForeignKey('Hotel', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

   