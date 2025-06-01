from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from .models import HotelPhoto, RoomPhoto
from pages.models.hotel_image import HotelPhoto
from pages.models.room_image import RoomPhoto

@api_view(["DELETE"])
def delete_image(request, image_id):
    try:
        photo = HotelPhoto.objects.filter(id=image_id).first() or RoomPhoto.objects.filter(id=image_id).first()
        if not photo:
            return Response({"error": "Image not found"}, status=status.HTTP_404_NOT_FOUND)
        photo.delete()
        return Response({"message": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)