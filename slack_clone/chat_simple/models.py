from django.db import models


class ChatMessage(models.Model):
    user = models.CharField(max_length=50)
    message = models.TextField()
