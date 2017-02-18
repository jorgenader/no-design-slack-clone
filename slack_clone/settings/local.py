# For production, change this to import from settings.production
from settings.base import *

# Add proper database name, user and password here, if necessary
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': 'localhost',
        'NAME': 'chat_demo',
        'USER': 'chat_demo',
        'PASSWORD': 'chat_demo',
    }
}

# For production, override SECRET_KEY
SITE_URL = 'http://localhost:8000'

# # For development:
# # Debug toolbar
# INSTALLED_APPS.append('debug_toolbar')
# INTERNAL_IPS = ('127.0.0.1',)
# MIDDLEWARE_CLASSES.append('debug_toolbar.middleware.DebugToolbarMiddleware')

# Uncomment to send emails from your local machine.
# EMAIL_HOST_PASSWORD = 'TODO (api key)'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Caching
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://localhost:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

# Channels settings
CHANNEL_LAYERS = {
   "default": {
       "BACKEND": "asgi_redis.RedisChannelLayer",  # use redis backend
       "CONFIG": {
           "hosts": ['redis://localhost:6379/2'],  # set redis address
       },
       "ROUTING": "slack_clone.routing.channel_routing",  # load routing from our routing.py file
   },
}
