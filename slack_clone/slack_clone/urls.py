from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import TemplateView


admin.autodiscover()

urlpatterns = [
    url(r'', include('accounts.urls')),

    url(r'^api/v1/', include('slack_clone.api_urls')),

    url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),

    # demos
    url(r'^cursor/$', TemplateView.as_view(template_name='cursor.html'), name='cursor'),
    url(r'^simple/$', TemplateView.as_view(template_name='simple_chat.html'), name='simple_chat'),
    url(r'^chat/$', TemplateView.as_view(template_name='chat.html'), name='chat'),

    url(r'^tagauks/', include(admin.site.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if not settings.DEBUG:
    handler500 = 'slack_clone.views.server_error'
    handler404 = 'slack_clone.views.page_not_found'

if settings.DEBUG:
    try:
        import debug_toolbar
        urlpatterns += [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ]
    except ImportError:
        pass
