import functools


def channel_room_id_mapping(func):
    """ attach room_id to message and return consumer or no-op
    """

    @functools.wraps(func)
    def inner(message, *args, **kwargs):
        room_id = message.content.get('room_id')
        if room_id:
            message.room_id = int(room_id)
            func(message, *args, **kwargs)
        else:
            pass

    return inner
