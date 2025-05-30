
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

from pages.models.hotel import Hotel
from pages.models.room import Room
from pages.models.room_animate import Room_animates
from pages.models.room_image import RoomPhoto
from pages.serializers.images import RoomAnimateSerializer, RoomPhotoSerializer
from pages.serializers.room import RoomSerializer

class AddRoomView(APIView):
    def post(self, request):
        hotel_id = request.data.get('hotel')
        if not hotel_id:
            return Response({"error": "Hotel ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        
        get_object_or_404(Hotel, id=hotel_id)

        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            room = serializer.save()
            return Response({"id": room.id, "message": "Room added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class UploadRoomPhotosView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        room_id = request.data.get("room")
        images = request.FILES.getlist('images')

        if not room_id:
            return Response({"error": "Room ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        get_object_or_404(Room, id=room_id)

        if not images:
            return Response({"error": "No images provided"}, status=status.HTTP_400_BAD_REQUEST)

        for image in images:
            serializer = RoomPhotoSerializer(data={"room": room_id, "image": image})
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Room photos uploaded successfully"}, status=status.HTTP_201_CREATED)







    
class RoomAnimatesListView(APIView):
    def get(self, request, room_id):
        animates = Room_animates.objects.filter(room_id=room_id)
        serializer = RoomAnimateSerializer(animates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
 

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
class RoomPhotosAPIView(APIView):
    def get(self, request, room_id):
        photos = RoomPhoto.objects.filter(room_id=room_id)
        serializer = RoomPhotoSerializer(photos, many=True)
        return Response(serializer.data)



class AllRoomPhotosAPIView(APIView):
    def get(self, request):
        photos = RoomPhoto.objects.all()
        serializer = RoomPhotoSerializer(photos, many=True)
        return Response(serializer.data)