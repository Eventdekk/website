from . import *
from django.apps import apps

class GroupModelManager(models.Manager):
    def get_group_events(self, group_id):
        try:
            group = self.model.objects.get(id=group_id)
        except self.model.DoesNotExist as e:
            raise e
        
        group_events = apps.get_model('api', 'EventModel').objects.filter(group=group)
        for event in group_events:
            event.units.set(apps.get_model('api', 'EventUnitModel').objects.filter(event=event).order_by('-date'))

        return group_events
