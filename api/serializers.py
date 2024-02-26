from rest_framework import serializers

from .models import *

class CounterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CounterModel
        fields = ('id', 'count')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'discord_id', 'uuid')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupModel
        fields = ('id', 'name', 'owner_id')

class GroupMembersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupMembersModel
        fields = ('id', 'group_id', 'owner_id', 'role')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventModel
        fields = ('id', 'group_id', 'name', 'description', 'ifc_link', 'thumbnail', 'date')

class EventJoiningSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventJoiningModel
        fields = ('id', 'event_id', 'group_id', 'departure', 'arrival', 'duration', 'est_pilots', 'act_pilots')
