from rest_framework import serializers
from pages.models.reviews import Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)  # overwrite user field

    class Meta:
        model = Review
        fields = ['id', 'user', 'comment', 'rating', 'created_at']


