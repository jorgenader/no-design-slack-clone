import json

from django.db import transaction

from channels import Group, Channel
from channels.auth import channel_session_user_from_http, channel_session_user

from chat.models import Room
from chat.api.serializers import MessageSerializer, RoomSerializer
from chat.decorators import channel_room_id_mapping


CHAT_GROUP_TEMPLATE = 'GROUP-%s'


@channel_session_user_from_http
def ws_connect(message):
    message.reply_channel.send({'accept': True})
    for room in list(message.user.room_list.all()):
        Group(CHAT_GROUP_TEMPLATE % room.id).add(message.reply_channel)
        response = dict(type='connect', )
        Channel('chat.receive').send(json.dumps({'type': 'connect', }))


@channel_session_user
def ws_message(message):
    parsed_message = json.loads(message.content['text'])
    Channel('chat.receive').send(parsed_message)


@channel_session_user
def ws_disconnect(message):
    for room in list(message.user.room_list.all()):
        Group(CHAT_GROUP_TEMPLATE % room.id).discard(message.reply_channel)


@channel_session_user
@channel_room_id_mapping
def join_room(message):
    with transaction.atomic():
        room = Room.objects.get(pk=message.room_id)
        room.members.add(message.user)
        room.save()
        Group(CHAT_GROUP_TEMPLATE % room.id).add(message.reply_channel)


@channel_session_user
def list_rooms(message):
    with transaction.atomic():
        room = Room.objects.all()
        serializer = RoomSerializer(room, many=True)


@channel_session_user
@channel_room_id_mapping
def leave_room(message):
    with transaction.atomic():
        room = Room.objects.get(pk=message.room_id)
        room.members.remove(message.user)
        room.save()
        Group(CHAT_GROUP_TEMPLATE % room.id).add(message.reply_channel)
