from channels import route
from . import consumers

routes = [
    # WS routing for communicating with clients
    route("websocket.connect", consumers.ws_connect),
    route("websocket.receive", consumers.ws_message),
    route("websocket.disconnect", consumers.ws_disconnect),
]

internal_routing = [
    route('chat-messages', consumers.msg_consumer, type=r'^message$'),
    route('chat-messages', consumers.join_consumer, type=r'^join$'),
    route('chat-messages', consumers.leave_consumer, type=r'^leave$'),
]
