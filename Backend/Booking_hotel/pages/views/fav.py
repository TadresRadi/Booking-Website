from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from pages.models.hotel import Hotel
from pages.models.fav import Favorite
from pages.serializers.fav import FavoriteHotelSerializer, FavoriteHotelInputSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def list_favorites(request):
    favorites = Favorite.objects.all()
    serializer = FavoriteHotelSerializer(favorites, many=True)
    return Response(serializer.data)
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def add_favorite(request):
    hotel_id = request.data.get('hotel_id')
    if not hotel_id:
        return Response({"error": "hotel_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        hotel = Hotel.objects.get(id=hotel_id)
    except Hotel.DoesNotExist:
        return Response({"error": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)

    # For testing: get a test user to assign to Favorite
    test_user = User.objects.first()  # or get a user you created manually

    if not test_user:
        return Response({"error": "No users exist in the system"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    favorite = Favorite(user=test_user, hotel=hotel)
    try:
        favorite.save()
        return Response({"message": "Added to favorites"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
@api_view(['POST'])
@permission_classes([AllowAny])
def remove_favorite(request):
    serializer = FavoriteHotelInputSerializer(data=request.data)
    if serializer.is_valid():
        hotel_id = serializer.validated_data['hotel_id']

        test_user = User.objects.first()  # same test user

        if not test_user:
            return Response({"error": "No users exist in the system"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            favorite = Favorite.objects.get(hotel_id=hotel_id, user=test_user)
            favorite.delete()
            return Response({'message': 'Removed from favorites'})
        except Favorite.DoesNotExist:
            return Response({'message': 'Not found in favorites'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
