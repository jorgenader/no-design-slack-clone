from django.db import models

from accounts.models import User


class Room(models.Model):
    description = models.TextField()
    name = models.SlugField(unique=True)
    creator = models.ForeignKey(User, null=False, related_name='rooms')
    members = models.ManyToManyField(User, related_name='room_list')

    class Meta:
        ordering = ('name',)


class Message(models.Model):

    MSG_JOIN = 'JOIN'
    MSG_LEAVE = 'LEAVE'
    MSG_TYPE = 'MSG'

    room = models.ForeignKey(Room, related_name='messages')
    author = models.ForeignKey(User)
    text = models.TextField(max_length=500)
    datetime = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-datetime',)
