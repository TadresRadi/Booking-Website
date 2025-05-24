from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from pages.models.hotel import Hotel
from pages.models.fav import Favorite
from pages.serializers.fav import FavoriteHotelSerializer, FavoriteHotelInputSerializer  # Make sure you import your serializers


@api_view(['GET'])
@permission_classes([AllowAny])
def list_favorites(request):
    # List all favorites (no user filtering since user=None)
    favorites = Favorite.objects.all()
    serializer = FavoriteHotelSerializer(favorites, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_favorite(request):
    serializer = FavoriteHotelInputSerializer(data=request.data)
    if serializer.is_valid():
        hotel_id = serializer.validated_data['hotel_id']
        try:
            hotel = Hotel.objects.get(id=hotel_id)
        except Hotel.DoesNotExist:
            return Response({'message': 'Hotel not found'}, status=404)

        # Save favorite with no user (None)
        Favorite.objects.get_or_create(user=None, hotel=hotel)
        return Response({'message': 'Added to favorites'})
    
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def remove_favorite(request):
    serializer = FavoriteHotelInputSerializer(data=request.data)
    if serializer.is_valid():
        hotel_id = serializer.validated_data['hotel_id']
        try:
            favorite = Favorite.objects.get(user=None, hotel_id=hotel_id)
            favorite.delete()
            return Response({'message': 'Removed from favorites'})
        except Favorite.DoesNotExist:
            return Response({'message': 'Not found in favorites'}, status=404)
    
    return Response(serializer.errors, status=400)
