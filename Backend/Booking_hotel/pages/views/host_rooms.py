from rest_framework.views import APIView
from rest_framework.response import Response
from pages.models.hotel import Hotel
from pages.models.room import Room
from pages.serializers.room import RoomSerializer

class HostRoomsView(APIView):
    def get(self, request, host_id):
        hotels = Hotel.objects.filter(owner_id=host_id)
        rooms = Room.objects.filter(hotel__in=hotels)
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)