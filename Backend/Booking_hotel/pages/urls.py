from django.urls import path, include
from .views import HotelListView, RegisterView ,RoomAnimatesListView
from django.contrib import admin
from .views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from .views import RoomPhotosAPIView

from .views import HotelDetailView
from .views import FavoriteHotelList, AddRemoveFavorite

urlpatterns = [
    
    path('register/', RegisterView.as_view(), name='register'),
    path('auth/', include('dj_rest_auth.urls')),  
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('admin/', admin.site.urls),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.register_user),
    path('search/', HotelListView.as_view(), name='hotel_search_api'),
    path('create-hotel/', views.HotelCreateView.as_view(), name='hotel_create_api'),
    path('facilities/', views.FacilitiesListView.as_view(), name='facilities_list_api'),
    path('animates/', views.RoomAnimatesListView.as_view(), name='room_animates_list_api'),
    path('hotel/<int:id>/', HotelDetailView.as_view(), name='hotel-detail'),
    path('api/rooms/<int:room_id>/photos/', RoomPhotosAPIView.as_view(), name='room-photos'),
    path('favorites/', FavoriteHotelList.as_view()),
    path('favorites/<int:hotel_id>/toggle/', AddRemoveFavorite.as_view()),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

