from django.urls import path, include
from .views import RegisterView, AddHotelView, AddRoomView,   AddDetails, UploadHotelPhotosView
from django.contrib import admin



urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),


    path('auth/', include('dj_rest_auth.urls')),  
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('admin/', admin.site.urls),

    path('add-hotel/', AddHotelView.as_view(), name='add-hotel'),
    path('add-room/', AddRoomView.as_view(), name='add-room'),
    path('add-details/', AddDetails.as_view(), name='add-details'),
    path('upload-photo/', UploadHotelPhotosView.as_view(), name='upload-hotel-photo'),
]
