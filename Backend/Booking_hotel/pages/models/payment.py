from django.db import models
from django.contrib.auth.models import User

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('mastercard', 'MasterCard'),
        ('paypal', 'PayPal'),
        ('visa', 'Visa'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payments" , null=True, blank=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    card_number = models.CharField(max_length=16)
    expiration = models.CharField(max_length=4)  # MMYY
    security_code = models.CharField(max_length=4)
    full_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    billing_address = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=15)
    remember = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.payment_method}"