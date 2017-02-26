from rest_framework import generics

from chat.models import Message, Room

from chat.api.serializers import MessagesSerializer, RoomSerializer


class MessagesListView(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessagesSerializer


class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
