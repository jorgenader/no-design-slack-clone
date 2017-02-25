import django.views.defaults
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter


router = DefaultRouter(trailing_slash=False)
# router.register(r'URL', VIEW_SET)

urlpatterns = [
    url(r'^simple/', include('chat_simple.api.urls')),
    url(r'^', include(router.urls)),
]
