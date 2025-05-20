from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FacilitiesSerializer, RegisterSerializer, RoomAnimateSerializer, RoomPhotoSerializer
from .serializers import LoginSerializer
from rest_framework.decorators import api_view
from .serializers import UserSerializer 
from .serializers import  HotelSerializer
from .models import Hotel, Room, Facility, Room_animates
from rest_framework.generics import RetrieveAPIView

from .serializers import HotelDetailSerializer
from rest_framework import viewsets

from .serializers import RoomSerializer
from .models import RoomPhoto



class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request, *args, **kwargs):
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


class HotelCreateView(APIView):
    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
    {"message": "The hotel was created", "data": serializer.data},
    status=status.HTTP_201_CREATED
)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    





# list filtered hotel by location    
from django.db.models import Q
from datetime import datetime

class HotelListView(APIView):
    def get(self, request):
        location = request.GET.get('location')
        adults = request.GET.get('adults')
        check_in = request.GET.get('check_in')  
        check_out = request.GET.get('check_out')

        if not location:
            return Response({"error": "Location is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        hotels = Hotel.objects.filter(location__icontains=location)

        rooms = Room.objects.all()
        if adults:
            rooms = rooms.filter(adult_capacity__gte= adults)

        # Optional: filter rooms available for the date range
        if check_in and check_out:
            # You'd need a Booking model to check for availability
            check_in_date = datetime.strptime(check_in, "%Y-%m-%d").date()
            check_out_date = datetime.strptime(check_out, "%Y-%m-%d").date()
            # rooms = rooms.exclude(
            #     bookings__check_in__lt=check_out_date,
            #     bookings__check_out__gt=check_in_date
            # )

        hotel_ids = rooms.values_list('hotel_id', flat=True).distinct()
        hotels = hotels.filter(id__in=hotel_ids)

        if not hotels.exists():
            return Response({"message": "No hotels found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = HotelSerializer(hotels, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# falities view to get all facilities
class FacilitiesListView(APIView):
    def get(self, request):
        facilities = Facility.objects.all()
        serializer = FacilitiesSerializer(facilities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RoomAnimatesListView(APIView):
    def get(self, request, room_id):
        animates = Room_animates.objects.filter(room_id=room_id)
        serializer = RoomAnimateSerializer(animates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
 
              
class HotelDetailView(RetrieveAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelDetailSerializer
    lookup_field = 'id'



class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
class RoomPhotosAPIView(APIView):
    def get(self, request, room_id):
        photos = RoomPhoto.objects.filter(room_id=room_id)
        serializer = RoomPhotoSerializer(photos, many=True)
        return Response(serializer.data)