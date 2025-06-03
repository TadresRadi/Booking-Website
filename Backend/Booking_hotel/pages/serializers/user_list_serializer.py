from rest_framework import serializers
from pages.models.user_profile import UserProfile

class UserListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email")
    date_joined = serializers.DateTimeField(source="user.date_joined")
    profile_image = serializers.SerializerMethodField()
    is_superuser = serializers.BooleanField(source='user.is_superuser', read_only=True)
    is_staff = serializers.BooleanField(source='user.is_staff', read_only=True)


    class Meta:
        model = UserProfile
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "profile_image",
            "date_joined",
            "is_superuser",
            "is_staff",
        ]

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image and hasattr(obj.profile_image, "url"):
            url = obj.profile_image.url
            if request is not None:
                return request.build_absolute_uri(url)
            return url
        return None