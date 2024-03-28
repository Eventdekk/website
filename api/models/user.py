from . import *
from django.apps import apps

class UserModelManager(models.Manager):
    def get_user_groups(self, uuid):
        try:
            user = self.model.objects.get(uuid=uuid)
        except self.model.DoesNotExist:
            return []
    
        group_memberships = apps.get_model('api', 'GroupMembersModel').objects.filter(user=user)

        groups_with_roles = []
        for membership in group_memberships:
            group_with_role = {
                'group': membership.group,
                'role': membership.role
            }
            groups_with_roles.append(group_with_role)

        return groups_with_roles
