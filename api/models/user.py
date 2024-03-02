from . import *
from django.apps import apps

class UserModelManager(models.Manager):
    def get_user_groups(self, uuid):
        try:
            user = self.model.objects.get(uuid=uuid)
        except self.DoesNotExist:
            return []

        groups = apps.get_model('api', 'GroupModel').objects.filter(members__user=user)
        return groups
