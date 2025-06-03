from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from pages.models.user_profile import UserProfile
from pages.serializers.user import UserProfileSerializer

class UpdateUserPermissionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        profile_requester = UserProfile.objects.get(user=request.user)
        if not profile_requester.is_superuser:
            return Response({'detail': 'Permission denied'}, status=403)

        try:
            profile = UserProfile.objects.get(id=user_id)
        except UserProfile.DoesNotExist:
            return Response({'detail': 'User not found'}, status=404)

        # اختياري: منع السوبر يوزر من تعديل نفسه
        if profile.user == request.user:
            return Response({'detail': 'You cannot change your own permissions.'}, status=400)

        is_admin = request.data.get('is_admin')
        is_superuser = request.data.get('is_superuser')
        if is_admin is not None:
            profile.is_admin = str(is_admin).lower() == "true"
        if is_superuser is not None:
            profile.is_superuser = str(is_superuser).lower() == "true"
        profile.save()

        serializer = UserProfileSerializer(profile, context={'request': request})
        return Response({'message': 'Permission updated successfully', 'profile': serializer.data})