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

class EventFlightSerializer(serializers.HyperlinkedModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = EventFlightModel
        fields = ('id', 'unit', 'group', 'departure', 'departure_time', 'arrival', 'arrival_time', 'est_pilots', 'act_pilots', 'pending')

class EventUnitSerializer(serializers.HyperlinkedModelSerializer):
    flights = EventFlightSerializer(many=True)

    class Meta:
        model = EventUnitModel
        fields = ('id', 'event', 'type', 'name', 'date', 'departure', 'arrival', 'flights')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    start_date = serializers.SerializerMethodField()
    end_date = serializers.SerializerMethodField()
    units = EventUnitSerializer(many=True)
    joining_groups = serializers.SerializerMethodField()
    group = serializers.PrimaryKeyRelatedField(queryset=GroupModel.objects.all(), write_only=True)
    
    class Meta:
        model = EventModel
        fields = ('id', 'group', 'name', 'description', 'ifc_link', 'thumbnail', 'start_date', 'end_date', 'units', 'joining_groups')
    
    def get_start_date(self, instance):
        first_unit = instance.units.first()
        return first_unit.date if first_unit else None

    def get_end_date(self, instance):
        last_unit = instance.units.last()
        return last_unit.date if last_unit else None

    def get_joining_groups(self, instance):
        unique_groups = set()

        for unit in instance.units.all():
            for flight in unit.flights.all():
                if flight.group:
                    unique_groups.add(flight.group)

        context = {'request': self.context.get('request')}
        return GroupSerializer(unique_groups, many=True, context=context).data
    
    def to_representation(self, instance):
        # Use the default representation
        representation = super().to_representation(instance)
        
        # Add the full group data using the GroupSerializer for GET responses
        representation['group'] = GroupSerializer(instance.group, context=self.context).data
        
        return representation
    
    def create(self, data):
        units_data = data.pop('units', [])
        event = EventModel.objects.create(**data)
        for unit_data in units_data:
            flights_data = unit_data.pop('flights', [])
            unit = EventUnitModel.objects.create(event=event, **unit_data)
            for flight_data in flights_data:
                EventFlightModel.objects.create(unit=unit, **flight_data)
        return event








