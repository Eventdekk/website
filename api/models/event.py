from . import *
from django.apps import apps

class EventModelManager(models.Manager):
    def to_be_used(self, event_id):
        return 'hi'


