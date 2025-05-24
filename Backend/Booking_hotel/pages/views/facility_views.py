from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from pages.models.facility import Facility
from pages.serializers.facility import FacilitiesSerializer, FacilitySerializer

class AddFacilityView(APIView):
    def post(self, request):
        serializer = FacilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# falities view to get all facilities
class FacilitiesListView(APIView):
    def get(self, request):
        facilities = Facility.objects.all()
        serializer = FacilitiesSerializer(facilities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
