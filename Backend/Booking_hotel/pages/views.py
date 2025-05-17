from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate
from .serializers import LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Facility, Hotel, Room, Details, HotelPhoto, RoomPhoto
from .serializers import (
    FacilitySerializer,
    HotelSerializer,
    RoomSerializer,
    DetailsSerializer,
    HotelPhotoSerializer,
    RoomPhotoSerializer,
    RegisterSerializer
)
from django.shortcuts import get_object_or_404


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


class AddFacilityView(APIView):
    def post(self, request):
        serializer = FacilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddHotelView(APIView):
    def post(self, request):
        facilities_data = request.data.get('facilities', [])

        
        if not Facility.objects.filter(id__in=facilities_data).count() == len(facilities_data):
            return Response({"error": "One or more facility IDs are invalid."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            hotel = serializer.save()
            hotel.facilities.set(facilities_data)  
            return Response({"id": hotel.id, "message": "Hotel added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class AddDetailsView(APIView):
    def post(self, request):
        hotel_id = request.data.get('hotel')
        if not hotel_id:
            return Response({"error": "Hotel ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if Details.objects.filter(hotel_id=hotel_id).exists():
            return Response({"error": "Details for this hotel already exist."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = DetailsSerializer(data=request.data)
        if serializer.is_valid():
            details = serializer.save()
            return Response({"id": details.id, "message": "Details added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UploadHotelPhotosView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        hotel_id = request.data.get("hotel")
        images = request.FILES.getlist('images')

        if not hotel_id:
            return Response({"error": "Hotel ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        get_object_or_404(Hotel, id=hotel_id)

        if not images:
            return Response({"error": "No images provided"}, status=status.HTTP_400_BAD_REQUEST)

        for image in images:
            serializer = HotelPhotoSerializer(data={"hotel": hotel_id, "image": image})
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Photos uploaded successfully"}, status=status.HTTP_201_CREATED)


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
