
from django.db import models

from .room import Room

class RoomPhoto(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='room_images/')

    def __str__(self):
        return f"Image for {self.room.name}"