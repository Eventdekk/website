from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

from . import UserModelManager, GroupModelManager

class UserModel(models.Model):
    discord_id = models.IntegerField(unique=True)  
    uuid = models.CharField(max_length=32, default="0")
    refresh_token = models.CharField(max_length=32, default="0")

    objects = UserModelManager()

class GroupModel(models.Model):
    owner = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='owned_groups', null=True)
    name = models.CharField(max_length=50)
    profile_link = models.URLField()

    objects = GroupModelManager()

class GroupMembersModel(models.Model):
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, related_name="members", null=True)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="groups", null=True)
    role = models.SmallIntegerField()

class EventModel(models.Model):
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, related_name='events', null=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    ifc_link = models.URLField()
    thumbnail = models.ImageField()

class EventUnitModel(models.Model):
    event = models.ForeignKey(EventModel, on_delete=models.CASCADE, related_name='units', null=True)
    type = models.SmallIntegerField()
    name = models.TextField()
    date = models.DateField(default=timezone.now().today)

class EventFlightModel(models.Model):
    unit = models.ForeignKey(EventUnitModel, on_delete=models.CASCADE, related_name='flights', null=True)
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, related_name="joining_events", null=True)
    departure = models.CharField(max_length=4)
    departure_time = models.TimeField(default=timezone.now)
    arrival = models.CharField(max_length=4)
    arrival_time = models.TimeField(default=timezone.now)
    est_pilots = models.SmallIntegerField()
    act_pilots = models.SmallIntegerField()
