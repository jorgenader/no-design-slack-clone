from django.db import models
from django.utils import timezone

from accounts.models import User


class Room(models.Model):
    name = models.TextField()
    label = models.SlugField(unique=True)
    created_by = models.ForeignKey(User)
    created_at = models.DateTimeField(default=timezone.now)


class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages')
    user = models.ForeignKey(User)
    handle = models.TextField()
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)
