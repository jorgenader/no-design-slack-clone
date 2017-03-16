from channels import route

from . import consumers

cursor_demo_routing = [
    # WS routing for communicating with clients
    consumers.EchoConsumer.as_route()
]
