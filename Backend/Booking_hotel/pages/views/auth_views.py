from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from pages.serializers.registeration import RegisterSerializer
from pages.serializers.login import LoginSerializer
from django.contrib.auth import authenticate
from pages.models.user_profile import UserProfile
from pages.serializers.user import UserProfileSerializer  
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            try:
                user_profile = UserProfile.objects.get(user=user)
                profile_serializer = UserProfileSerializer(user_profile, context={'request': request})
                profile_data = profile_serializer.data
            except UserProfile.DoesNotExist:
                profile_data = {}

            data = {
                "message": "Account created successfully",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    **profile_data
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }
            }
            return Response(data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                try:
                    user_profile = UserProfile.objects.get(user=user)
                    profile_serializer = UserProfileSerializer(user_profile, context={'request': request})
                    profile_data = profile_serializer.data
                except UserProfile.DoesNotExist:
                    user_profile = None
                    profile_data = {}

                data = {
                    "message": "Login successful",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "is_admin": getattr(user_profile, "is_admin", False),
                        "is_superuser": user.is_superuser,
                        **profile_data
                    },
                    "tokens": {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token)
                    }
                }
                return Response(data, status=status.HTTP_200_OK)
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # ⬅️ أضف دي

    def get(self, request):
        user = request.user
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"detail": "User profile not found."}, status=404)

        serializer = UserProfileSerializer(user_profile, context={'request': request})
        return Response({
            "first_name": user.first_name,
            "last_name": user.last_name,
            **serializer.data
        })

    def put(self, request):
        user = request.user
        data = request.data

        # Update User fields
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()

        # Update Profile fields
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"detail": "User profile not found."}, status=404)

        user_profile.phone_number = data.get('phone_number', user_profile.phone_number)
        user_profile.address = data.get('address', user_profile.address)

        # ✅ تحديث صورة البروفايل لو موجودة
        if 'profile_image' in request.FILES:
            user_profile.profile_image = request.FILES['profile_image']

        user_profile.save()

        serializer = UserProfileSerializer(user_profile, context={'request': request})
        return Response({
            "first_name": user.first_name,
            "last_name": user.last_name,
            **serializer.data
        })