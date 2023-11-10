from django.db import models

class CounterModel(models.Model):
    count = models.IntegerField(default=0)

    def __str__(self):
        return "Counter"

class UserModel(models.Model):
    discord = models.CharField()

class GroupModel(models.Model):
    name = models.CharField()
    owner_id = models.IntegerField()

class GroupMembersModel(models.Model):
    group_id = models.BigIntegerField()
    user_id = models.BigIntegerField()
    role = models.SmallIntegerField()

class EventModel(models.Model):
    group_id = models.BigIntegerField()
    name = models.CharField(max_length=50)
    description = models.TextField()
    ifc_link = models.URLField()
    thumbnail = models.ImageField()

class EventJoiningModel(models.Model):
    event_id = models.BigIntegerField()
    group_id = models.BigIntegerField()
    departure = models.CharField(max_length=4)
    arrival = models.CharField(max_length=4)
    duration = models.DurationField()
    est_pilots = models.SmallIntegerField()
    act_pilots = models.SmallIntegerField() 

