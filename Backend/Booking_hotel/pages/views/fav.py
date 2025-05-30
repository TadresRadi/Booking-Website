from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated  # فقط المستخدمين المسجلين
from rest_framework.response import Response
from rest_framework import status
from pages.models.hotel import Hotel
from pages.models.fav import Favorite
from pages.serializers.fav import FavoriteHotelSerializer, FavoriteHotelInputSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # فقط للمستخدمين المسجلين
def list_favorites(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    serializer = FavoriteHotelSerializer(favorites, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # فقط للمستخدمين المسجلين
def add_favorite(request):
    hotel_id = request.data.get('hotel_id')
    if not hotel_id:
        return Response({"error": "hotel_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        hotel = Hotel.objects.get(id=hotel_id)
    except Hotel.DoesNotExist:
        return Response({"error": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    # تأكد عدم تكرار المفضلة لنفس المستخدم
    if Favorite.objects.filter(user=user, hotel=hotel).exists():
        return Response({"message": "Already in favorites"}, status=status.HTTP_200_OK)

    favorite = Favorite(user=user, hotel=hotel)
    favorite.save()
    return Response({"message": "Added to favorites"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # فقط للمستخدمين المسجلين
def remove_favorite(request):
    serializer = FavoriteHotelInputSerializer(data=request.data)
    if serializer.is_valid():
        hotel_id = serializer.validated_data['hotel_id']
        user = request.user

        try:
            favorite = Favorite.objects.get(hotel_id=hotel_id, user=user)
            favorite.delete()
            return Response({'message': 'Removed from favorites'})
        except Favorite.DoesNotExist:
            return Response({'message': 'Not found in favorites'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
