
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from pages.models.room import Room
from pages.serializers.images import HotelPhotoSerializer
from pages.models.facility import Facility
from pages.serializers.list_hotel_card import HotelSerializer
from pages.models.hotel import Hotel
from pages.serializers.hotel_detailes import HotelDetailSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from pages.models.hotel_image import HotelPhoto






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











# class UploadHotelPhotosView(APIView):
#     parser_classes = [MultiPartParser, FormParser]

#     def post(self, request):
#         hotel_id = request.data.get("hotel")
#         images = request.FILES.getlist('images')
#         is_main_values = request.data.getlist('is_main')  

#         if not hotel_id:
#             return Response({"error": "Hotel ID is required"}, status=status.HTTP_400_BAD_REQUEST)

#         get_object_or_404(Hotel, id=hotel_id)

#         if not images:
#             return Response({"error": "No images provided"}, status=status.HTTP_400_BAD_REQUEST)

       
#         if len(is_main_values) != len(images):
#             return Response({"error": "Mismatch between images and is_main flags"}, status=status.HTTP_400_BAD_REQUEST)

#         for image, is_main in zip(images, is_main_values):
            
#             is_main_bool = True if is_main.lower() == 'true' else False

#             serializer = HotelPhotoSerializer(data={
#                 "hotel": hotel_id,
#                 "image": image,
#                 "is_main": is_main_bool,
#             })

#             if serializer.is_valid():
#                 serializer.save()
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         return Response({"message": "Photos uploaded successfully"}, status=status.HTTP_201_CREATED)




class UploadHotelPhotosView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        hotel_id = request.data.get("hotel")
        images = request.FILES.getlist('images')
        is_main_values = request.data.getlist('is_main')  

        if not hotel_id:
            return Response({"error": "Hotel ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        hotel = get_object_or_404(Hotel, id=hotel_id)

        if not images:
            return Response({"error": "No images provided"}, status=status.HTTP_400_BAD_REQUEST)

        if len(is_main_values) != len(images):
            return Response({"error": "Mismatch between images and is_main flags"}, status=status.HTTP_400_BAD_REQUEST)

        for image, is_main in zip(images, is_main_values):
            is_main_bool = True if is_main.lower() == 'true' else False

           
            if is_main_bool:
                HotelPhoto.objects.filter(hotel=hotel, is_main=True).update(is_main=False)

            serializer = HotelPhotoSerializer(data={
                "hotel": hotel_id,
                "image": image,
                "is_main": is_main_bool,
            })

            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Photos uploaded successfully"}, status=status.HTTP_201_CREATED)
    
    
class EditHotelView(APIView):
    def put(self, request, id):
        hotel = get_object_or_404(Hotel, id=id)
        facilities_data = request.data.get('facilities', [])

        if not Facility.objects.filter(id__in=facilities_data).count() == len(facilities_data):
            return Response({"error": "One or more facility IDs are invalid."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = HotelSerializer(hotel, data=request.data)
        if serializer.is_valid():
            updated_hotel = serializer.save()
            updated_hotel.facilities.set(facilities_data)
            return Response({"message": "Hotel updated successfully!", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class HotelPhotosAPIView(APIView):
    def get(self, request, hotel_id):
        hotel = get_object_or_404(Hotel, id=hotel_id)
        photos = HotelPhoto.objects.filter(hotel=hotel)
        serializer = HotelPhotoSerializer(photos, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    

class UpdateHotelPhotosView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, hotel_id):
        hotel = get_object_or_404(Hotel, id=hotel_id)
        images = request.FILES.getlist('images')
        is_main_values = request.data.getlist('is_main')  

        if not images:
            return Response({"error": "No images provided"}, status=status.HTTP_400_BAD_REQUEST)

        if is_main_values and len(is_main_values) != len(images):
            return Response({"error": "Mismatch between images and is_main flags"}, status=status.HTTP_400_BAD_REQUEST)

        HotelPhoto.objects.filter(hotel=hotel).delete()

        for idx, image in enumerate(images):
            is_main = False
            if is_main_values:
                is_main = is_main_values[idx].lower() == 'true'

            if is_main:
                HotelPhoto.objects.filter(hotel=hotel, is_main=True).update(is_main=False)

            serializer = HotelPhotoSerializer(data={
                'hotel': hotel.id,
                'image': image,
                'is_main': is_main
            })

            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Hotel photos updated successfully"}, status=status.HTTP_200_OK)
    





class HotelListView(APIView):
    def get(self, request):
        location = request.GET.get('location-or-hotel')
        adults = request.GET.get('adults')
        check_in = request.GET.get('check_in')  
        check_out = request.GET.get('check_out')

        if not location:
            return Response({"error": "Location is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        hotels = Hotel.objects.filter(Q(location__icontains=location) | Q(hotel_name__icontains=location))
        


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


from rest_framework.generics import RetrieveAPIView

class HotelDetailView(RetrieveAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelDetailSerializer
    lookup_field = 'id'



class AllHotelsView(APIView):
    pagination_class = PageNumberPagination  # تعيين نوع pagination

    def get(self, request):
        hotels = Hotel.objects.all().order_by('id')  # ممكن ترتب حسب id أو حسب حاجة تانية
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(hotels, request, view=self)
        serializer = HotelSerializer(page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)
    


class HotelDetail(APIView):
    def delete(self, request, pk):
        try:
            hotel = Hotel.objects.get(pk=pk)
        except Hotel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        hotel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


