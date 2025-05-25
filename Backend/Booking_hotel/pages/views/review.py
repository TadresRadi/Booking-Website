from rest_framework.generics import ListAPIView
from pages.models.reviews import Review
from pages.serializers.review import ReviewSerializer

class ReviewListView(ListAPIView):
    queryset = Review.objects.all().order_by('-created_at')  # Latest first
    serializer_class = ReviewSerializer