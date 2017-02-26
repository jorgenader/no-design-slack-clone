from channels import route

from chat import consumers

chat_routing = [
    route("websocket.connect", consumers.ws_connect),
    route("websocket.receive", consumers.ws_message),
    route("websocket.disconnect", consumers.ws_disconnect),
]

internal_routing = [
    route('chat-messages', consumers.msg_consumer, command=r'^message$'),
    route('chat-messages', consumers.join_consumer, command=r'^join$'),
    route('chat-messages', consumers.leave_consumer, command=r'^leave$'),
]
