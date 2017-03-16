from rest_framework import generics

from ..models import ChatMessage

from .serializers import MessageSerializer


class MessagesListView(generics.ListAPIView):
    queryset = ChatMessage.objects.all().order_by('-id')[:50]
    serializer_class = MessageSerializer
