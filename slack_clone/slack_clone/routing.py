from channels import include


channel_routing = [
    include('chat.routing.chat_routing', path=r'^/chat/stream/$'),
    include('chat_simple.routing.chat_simple_routes', path=r'^/simple/stream/$'),
    include('cursor_demo.routing.cursor_demo_routing', path=r'^/cursor/stream/$'),

    # include internal routing's
    include('chat.routing.internal_routing'),
    include('chat_simple.routing.internal_routing'),
]
