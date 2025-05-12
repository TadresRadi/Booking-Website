from django.urls import path, include
from .views import RegisterView
from django.contrib import admin
from .views import LoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views



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
   
    
]
