from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from pages.models.payment import Payment
from pages.serializers.payment_serializer import PaymentSerializer
from django.contrib.auth import get_user_model

class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)

class AdminPaymentListView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsSuperUser]

    def get(self, request):
        payments = Payment.objects.all().order_by('-created_at')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)