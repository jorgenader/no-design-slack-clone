from django.conf import settings
from channels.generic.websockets import WebsocketDemultiplexer, JsonWebsocketConsumer


class EchoConsumer(JsonWebsocketConsumer):
    def connect(self, message, **kwargs):
        super().connect(message, **kwargs)

    def disconnect(self, message, **kwargs):
        pass

    def receive(self, content, **kwargs):
        pass


class ChatDemux(WebsocketDemultiplexer):
    pass
