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
        fields = ('id', 'group', 'name', 'description', 'ifc_link', 'thumbnail', 'date')

class EventJoiningSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventJoiningModel
        fields = ('id', 'event', 'group', 'departure', 'arrival', 'duration', 'est_pilots', 'act_pilots')
