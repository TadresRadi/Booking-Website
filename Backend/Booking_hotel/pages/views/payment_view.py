from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pages.serializers.payment_serializer import PaymentSerializer
from rest_framework.permissions import IsAuthenticated
from pages.models.user_profile import UserProfile
from pages.models.payment import Payment

class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        serializer = PaymentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            payment = serializer.save()
            # --------- تحديث بيانات البروفايل تلقائيًا -----------
            try:
                user_profile = UserProfile.objects.get(user=request.user)
                data = request.data
                # حدث الاسم ورقم الموبايل والعنوان لو اختلفوا
                if 'full_name' in data and data['full_name']:
                    parts = data['full_name'].split(" ")
                    request.user.first_name = parts[0]
                    request.user.last_name = " ".join(parts[1:]) if len(parts) > 1 else ""
                    request.user.save()
                if 'phone' in data and data['phone']:
                    user_profile.phone_number = data['phone']
                if 'billing_address' in data and data['billing_address']:
                    user_profile.address = data['billing_address']
                user_profile.save()
            except UserProfile.DoesNotExist:
                pass
            # ------------------------------------------------------
            return Response({"message": "Payment saved successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PaymentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user).order_by('-created_at')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)