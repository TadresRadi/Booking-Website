
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# User Login Serializer



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


