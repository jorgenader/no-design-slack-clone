from django.conf.urls import url
from .views import MessagesListView


urlpatterns = [
    url(r'^messages$', MessagesListView.as_view(), name='api-messages-list'),
]
