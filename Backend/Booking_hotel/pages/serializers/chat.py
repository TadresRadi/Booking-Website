from rest_framework import serializers
from pages.models.chat import ChatMessage
from django.contrib.auth import get_user_model

User = get_user_model()

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email' ]

class ChatMessageSerializer(serializers.ModelSerializer):
    sender = UserInfoSerializer(read_only=True)
    receiver = UserInfoSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'receiver', 'message', 'image', 'created_at', 'is_read']