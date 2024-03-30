from . import *
from django.apps import apps

class EventModelManager(models.Manager):
    def get_event_details(self, event_id):
        try:
            event = self.model.objects.get(id=event_id)
        except self.model.DoesNotExist as e:
            raise e
        
        event_units = apps.get_model('api', 'EventUnitModel').objects.filter(event=event)
        for unit in event_units:
            unit.flights.set(apps.get_model('api', 'EventFlightModel').objects.filter(unit=unit))
        
        return event_units



