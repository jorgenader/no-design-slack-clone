from rest_framework import serializers

from accounts.models import User
from chat.models import Message, Room


class _UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name')


class MessageSerializer(serializers.ModelSerializer):
    author = _UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'author', 'datetime', 'text')


# noinspection PyAbstractClass
class MessagesSerializer(serializers.Serializer):
    messages = MessageSerializer(many=True)


class RoomSerializer(serializers.ModelSerializer):
    creator = _UserSerializer(read_only=True)

    class Meta:
        model = Room
        fields = ('id', 'name', 'description', 'members', 'creator',)
