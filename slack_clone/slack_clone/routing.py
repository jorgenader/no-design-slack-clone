from channels import include
from chat.routing import routes
from chat_simple.routing import routes as chat_simple_routes


channel_routing = [
    include(routes, path=r'^/chat'),
    include(chat_simple_routes, path=r'^/simple/stream/$'),
    include(routes, path=r'^/chat'),

    # include internal routings
    include("chat_simple.routing.internal_routing"),
]
