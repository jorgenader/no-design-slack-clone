from django.db import models
from django.utils import timezone

from accounts.models import User


class Room(models.Model):
    name = models.TextField()
    label = models.SlugField(unique=True)
    users = models.ManyToManyField(User)

    created_by = models.ForeignKey(User, related_name='rooms')
    created_at = models.DateTimeField(default=timezone.now)


class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages')
    user = models.ForeignKey(User)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return '{} at {}'.format(self.user, self.timestamp)
