from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=100, null=True)
    address = models.TextField(null=True)
    city = models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50, null=True)
    stars = models.PositiveIntegerField(default=3, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(null=True)
    location = models.CharField(null=True )  # important

    def __str__(self):
        return self.name if self.name else "Unnamed Hotel"
