from rest_framework.permissions import BasePermission
from pages.models.user_profile import UserProfile

class IsAdminOrSuperUser(BasePermission):
    def has_permission(self, request, view):
        try:
            profile = UserProfile.objects.get(user=request.user)
            return profile.is_admin or profile.is_superuser
        except UserProfile.DoesNotExist:
            return False