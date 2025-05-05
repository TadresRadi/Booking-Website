from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    accept_terms = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'accept_terms']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate_accept_terms(self, value):
        if not value:
            raise serializers.ValidationError("You must accept the terms and policies.")
        return value

    def create(self, validated_data):
        validated_data.pop('accept_terms')

        
        first_name = validated_data['first_name'].strip().lower()
        last_name = validated_data['last_name'].strip().lower()
        base_username = f"{first_name} {last_name}"
        username = base_username
        counter = 1

        while User.objects.filter(username=username).exists():
           username = f"{base_username}{counter}"
           counter += 1

        user = User.objects.create_user(
            username=username,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Check if the credentials are correct
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password")

        return {
            'user': user,
            'username': username,
        }
