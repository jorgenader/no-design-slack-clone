from settings.local import *

SEND_EMAILS = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'no_design_slack_clone',
        'TEST': {
            'NAME': 'no_design_slack_clone_test',
        },
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
