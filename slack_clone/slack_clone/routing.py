from channels import include
from chat.routing import routes

channel_routing = [
    include(routes, path=r'^/chat')
]
