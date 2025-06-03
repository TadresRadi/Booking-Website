from rest_framework import generics, permissions, status
from pages.models.user_profile import UserProfile
from pages.serializers.user_list_serializer import UserListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class UsersListView(generics.ListAPIView):
    queryset = UserProfile.objects.select_related("user").all()
    serializer_class = UserListSerializer
    permission_classes = [permissions.IsAdminUser]  # فقط الأدمن أو السوبر يوزر

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    

class ToggleManagerStatus(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, user_id):
        try:
            profile = UserProfile.objects.get(id=user_id)
            user = profile.user

            # منع تغيير صلاحيات السوبر يوزر لنفسه
            if user == request.user:
                return Response({"error": "لا يمكن تعديل صلاحيات السوبر يوزر الخاصة بك"}, status=status.HTTP_400_BAD_REQUEST)

            new_status = not user.is_superuser
            user.is_superuser = new_status
            user.is_staff = new_status
            user.save()

            profile.is_superuser = new_status
            profile.save()

            return Response({
                "success": True,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff
            })

        except UserProfile.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)