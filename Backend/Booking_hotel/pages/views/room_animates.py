
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from pages.models.room_animate import Room_animates
from pages.serializers.images import RoomAnimateSerializer


class All_Animates (APIView) :
     def get(self, request):
        animates = Room_animates.objects.all()
        serializer = RoomAnimateSerializer(animates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
