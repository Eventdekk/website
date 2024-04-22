from rest_framework import serializers

from .models import *

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'discord_id', 'uuid', 'discord_refresh_token')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupModel
        fields = ('id', 'owner', 'name', 'profile_link')

class GroupMembersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GroupMembersModel
        fields = ('id', 'group', 'user', 'role')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()
    class Meta:
        model = EventModel
        fields = ('id', 'group', 'name', 'description', 'ifc_link', 'thumbnail', 'units', 'start_date', 'end_date')
    
    def get_start_date(self, instance):
        first_unit = instance.units.first()
        return first_unit.date if first_unit else None

    def get_end_date(self, instance):
        last_unit = instance.units.last()
        return last_unit.date if last_unit else None

class EventUnitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventUnitModel
        fields = ('id', 'event', 'type', 'name', 'date', 'flights')

class EventFlightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EventFlightModel
        fields = ('id', 'unit', 'group', 'departure', 'departure_time', 'arrival', 'arrival_time', 'est_pilots', 'act_pilots')




