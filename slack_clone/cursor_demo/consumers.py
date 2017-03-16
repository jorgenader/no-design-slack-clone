import json

from channels import Group
from channels.generic import websockets


class EchoConsumer(websockets.JsonWebsocketConsumer):
    def connect(self, message, **kwargs):
        super().connect(message, **kwargs)
        Group('load').add(message.reply_channel)

    def disconnect(self, message, **kwargs):
        super().disconnect(message, **kwargs)
        Group('load').discard(message.reply_channel)

    def receive(self, content, **kwargs):
        # Simple echo
        self.group_send('load', content)
        Group('load').send(dict(text=json.dumps(content)), immediately=True)
