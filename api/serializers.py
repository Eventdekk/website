from rest_framework import serializers

from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'discord_id', 'uuid', 'refresh_token')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupModel
        fields = ('id', 'owner', 'name', 'profile_link')

class GroupMembersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupMembersModel
        fields = ('id', 'group', 'user', 'role')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventModel
        fields = ('id', 'group', 'name', 'description', 'ifc_link', 'thumbnail')

class EventUnitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventUnitModel
        fields = ('id', 'event', 'type', 'name', 'date')

class EventFlightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventFlightModel
        fields = ('id', 'unit', 'group', 'departure', 'departure_time', 'arrival', 'arrival_time', 'est_pilots', 'act_pilots')
