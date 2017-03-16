import uuid
import json

from channels import Channel, Group
from channels.auth import channel_session_user_from_http, channel_session_user

from .models import ChatMessage


def msg_consumer(message):
    user = message.content['user']
    text = message.content['text']
    # Save to model
    chat = ChatMessage.objects.create(user=user, message=text)
    # Broadcast to listening client in the room
    response = dict(id=chat.id, user=user, message=text)
    Group('chat').send({'text': json.dumps(response)})


def join_consumer(message):
    response = dict(id=str(uuid.uuid4()), user=message.content['user'], message=' <joined>')
    Group('chat').send({'text': json.dumps(response)})


def leave_consumer(message):
    response = dict(id=str(uuid.uuid4()), user=message.content['user'], message=' <left>')
    Group('chat').send({'text': json.dumps(response)})


@channel_session_user_from_http
def ws_connect(message):
    message.reply_channel.send({'accept': True})
    # Add us to the chat group
    message.channel_session['user'] = None
    Group('chat').add(message.reply_channel)


@channel_session_user
def ws_message(message):
    # Stick the message onto the processing queue
    parsed_message = json.loads(message['text'])
    message.channel_session['user'] = parsed_message.get('user')
    Channel('chat-messages').send(parsed_message)


@channel_session_user
def ws_disconnect(message):
    user = message.channel_session.get('user')
    if user:
        Channel('chat-messages').send({'type': 'leave', 'user': user})
    Group('chat').discard(message.reply_channel)
