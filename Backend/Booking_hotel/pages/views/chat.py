from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Q
from django.contrib.auth import get_user_model
from pages.models.chat import ChatMessage
from pages.serializers.chat import ChatMessageSerializer, UserInfoSerializer
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

# 1. Get all user chats (for admin sidebar)
class AdminChatListView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        admin = request.user
        qs = ChatMessage.objects.filter(receiver=admin).order_by('-created_at')
        user_ids = qs.values_list('sender', flat=True).distinct()
        users = User.objects.filter(id__in=user_ids)
        data = []
        for user in users:
            last_msg = ChatMessage.objects.filter(
                Q(sender=user, receiver=admin) | Q(sender=admin, receiver=user)
            ).order_by('-created_at').first()
            data.append({
                "id": user.id,
                "name": user.get_full_name() or user.username,
                "profile_image": (request.build_absolute_uri(user.userprofile.profile_image.url) if hasattr(user, "userprofile") and user.userprofile.profile_image else ""),
                "lastMsg": last_msg.message if last_msg else "",
                "lastMsgTime": last_msg.created_at if last_msg else "",
            })
        return Response(data)

# 2. Get messages between admin and user
class AdminUserChatMessagesView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, user_id):
        admin = request.user
        user = User.objects.get(id=user_id)
        msgs = ChatMessage.objects.filter(
            (Q(sender=admin, receiver=user) | Q(sender=user, receiver=admin))
        ).order_by('created_at')
        return Response(ChatMessageSerializer(msgs, many=True).data)

# 3. Get messages for current user with admin
class UserChatMessagesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        try:
            admin = User.objects.filter(is_superuser=True).first()
            if not admin:
                return Response([], status=404)
            msgs = ChatMessage.objects.filter(
                (Q(sender=user, receiver=admin) | Q(sender=admin, receiver=user))
            ).order_by('created_at')
            return Response(ChatMessageSerializer(msgs, many=True).data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

# 4. Send message
class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        receiver_id = request.data.get('receiver')
        message = request.data.get('message', '')
        image = request.FILES.get('image')
        receiver = User.objects.get(id=receiver_id)
        msg = ChatMessage.objects.create(
            sender=request.user,
            receiver=receiver,
            message=message,
            image=image
        )
        return Response(ChatMessageSerializer(msg).data)
    
class AdminUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        admin = User.objects.filter(is_superuser=True).first()
        if admin:
            return Response({
                "id": admin.id,
                "username": admin.username,
                "email": admin.email
            })
        return Response({}, status=404)