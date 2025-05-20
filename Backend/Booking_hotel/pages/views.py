from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from .serializers import LoginSerializer
from rest_framework.decorators import api_view
from .serializers import UserSerializer 
from .serializers import  HotelSerializer
from .models import Hotel
from rest_framework.generics import RetrieveAPIView
from .serializers import HotelDetailSerializer
from rest_framework import viewsets
from .models import Room
from .serializers import RoomSerializer
from .models import RoomPhoto
from rest_framework import permissions
from .models import FavoriteHotel
from .serializers import FavoriteHotelSerializer


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
class HotelListView(APIView):

    def get(self, request):
        country = request.GET.get('country')
        location = request.GET.get('location')

        hotels = Hotel.objects.all()

        if country:
            hotels = hotels.filter(country__icontains=country)
        if location:
            hotels = hotels.filter(location__icontains=location)

        if not hotels.exists():
            return Response({"message": "No hotels found matching the filters"}, status=status.HTTP_404_NOT_FOUND)

        serializer = HotelSerializer(hotels, many=True)
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
class FavoriteHotelList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        favorites = FavoriteHotel.objects.filter(user=request.user)
        serializer = FavoriteHotelSerializer(favorites, many=True)
        return Response(serializer.data)

class AddRemoveFavorite(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, hotel_id):
        hotel = Hotel.objects.get(id=hotel_id)
        favorite, created = FavoriteHotel.objects.get_or_create(user=request.user, hotel=hotel)
        if not created:
            favorite.delete()
            return Response({"status": "removed"})
        return Response({"status": "added"})