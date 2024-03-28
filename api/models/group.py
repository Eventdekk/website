from . import *
from django.apps import apps

class GroupModelManager(models.Manager):
    def get_group_events(self, group_id):
        try:
            group = self.model.objects.get(id=group_id)
        except self.model.DoesNotExist:
            return []
        
        group_events = apps.get_model('api', 'EventModel').objects.filter(group=group)

        return group_events
