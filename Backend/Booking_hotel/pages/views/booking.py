from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pages.serializers.booking import BookingSerializer
from django.contrib.auth.decorators import login_required

@api_view(['POST'])
def Create_booking(request):
    if not request.user or not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."},
                        status=status.HTTP_401_UNAUTHORIZED)

    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
