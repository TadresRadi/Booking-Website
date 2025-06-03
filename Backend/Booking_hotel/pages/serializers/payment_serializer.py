from rest_framework import serializers
from pages.models.payment import Payment
import re

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['payment_method', 'card_number', 'expiration', 'security_code', 'full_name', 
                  'birth_date', 'country', 'state', 'billing_address', 'zip_code', 'phone', 'remember','id', 'created_at']

    def validate_expiration(self, value):
        if not re.fullmatch(r'\d{4}', value):
            raise serializers.ValidationError("Expiration date must be 4 digits (MMYY) with no letters or symbols.")
        month = int(value[:2])
        if month < 1 or month > 12:
            raise serializers.ValidationError("Invalid month in expiration date.")
        return value

    def validate_card_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Card number must contain digits only.")
        if len(value) != 16:
            raise serializers.ValidationError("Card number must be 16 digits.")
        return value

    def validate_security_code(self, value):
        if not value.isdigit() or len(value) not in [3, 4]:
            raise serializers.ValidationError("Security code (CVV) must be 3 or 4 digits.")
        return value

    def validate_full_name(self, value):
        if not re.fullmatch(r'[A-Za-z ]+', value):
            raise serializers.ValidationError("Full name must contain letters and spaces only, no numbers or symbols.")
        return value

    def validate_billing_address(self, value):
        if not re.fullmatch(r'[A-Za-z0-9 ,.-]+', value):
            raise serializers.ValidationError("Billing address must contain letters, digits, spaces, commas, dots or dashes only.")
        return value

    def validate_zip_code(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("ZIP code must contain digits only.")
        return value

    def validate_phone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain digits only.")
        return value
    
    def create(self, validated_data):
        user = self.context['request'].user
        return Payment.objects.create(user=user, **validated_data)