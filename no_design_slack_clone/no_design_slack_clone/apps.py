from django.apps import AppConfig
from django.core import checks

from tg_utils.checks import check_production_settings, check_sentry_config


class No_design_slack_cloneConfig(AppConfig):
    name = 'no_design_slack_clone'
    verbose_name = "No Design Slack Clone"

    def ready(self):
        # Import and register the system checks
        checks.register(check_production_settings)
        checks.register(check_sentry_config)
