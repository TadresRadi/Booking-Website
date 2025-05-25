from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from pages.views.hotel_views import HotelCreateView, HotelListView, HotelDetailView, AddHotelView, UploadHotelPhotosView
from pages.views.rooms_views import RoomAnimatesListView, RoomPhotosAPIView, AddRoomView, UploadRoomPhotosView
from pages.views.facility_views import  AddFacilityView , FacilitiesListView
from pages.views.auth_views import RegisterView, LoginView
from dj_rest_auth.registration.views import RegisterView as DJRegisterView
from pages.views.fav import list_favorites, add_favorite, remove_favorite
from pages.views.hotel_views import AllHotelsView 
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from pages.views.rooms_views import AllRoomPhotosAPIView

from pages.views.review import ReviewListView


from pages.views.rooms_views import RoomViewSet
router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='rooms')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('auth/', include('dj_rest_auth.urls')),  
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('search/', HotelListView.as_view(), name='hotel_search_api'),
    path('create-hotel/', HotelCreateView.as_view(), name='hotel_create_api'),
    path('facilities/', FacilitiesListView.as_view(), name='facilities_list_api'),
    path('rooms/<int:room_id>/animates/', RoomAnimatesListView.as_view(), name='room-animates'),
    path('hotel/<int:id>/', HotelDetailView.as_view(), name='hotel-detail'),
    path('api/rooms/<int:room_id>/photos/', RoomPhotosAPIView.as_view(), name='room-photos'),
    path('add-facility/', AddFacilityView.as_view(), name='add-facility'),
    path('add-hotel/', AddHotelView.as_view(), name='add-hotel'),
    path('add-room/', AddRoomView.as_view(), name='add-room'),
    path('AddHotelImages/', UploadHotelPhotosView.as_view(), name='upload-hotel-photos'),
    path('AddRoomImages/', UploadRoomPhotosView.as_view(), name='upload-room-photos'),
    path('favorites/', list_favorites, name='list_favorites'),          # GET all favorites
    path('favorites/add/', add_favorite, name='add_favorite'),          # POST to add favorite
    path('favorites/remove/', remove_favorite, name='remove_favorite'), 
    path('hotels/', AllHotelsView.as_view(), name='all_hotels'),
    path('', include(router.urls)), 
    path('room-photos/', AllRoomPhotosAPIView.as_view(), name='all-room-photos'),
    path('reviews/', ReviewListView.as_view(), name='review-list'),
    
    
    
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)