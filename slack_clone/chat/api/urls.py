from django.conf.urls import url

from chat.api.views import MessagesListView, RoomListView


urlpatterns = [
    url(r'^rooms', RoomListView.as_view(), name='api-room-list'),
    url(r'^messages$', MessagesListView.as_view(), name='api-messages-list'),
]
