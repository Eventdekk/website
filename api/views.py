from django.http import HttpResponseBadRequest
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import *
from .models import *
from .auth import Discord, Authentication, jwt_required
from .cache import Cache

import uuid

from config import *

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    @action(detail=False, methods=['get'], url_path='data/(?P<uuid_str>[^/.]+)')
    @jwt_required
    def get_user_data(self, request, uuid_str=None):
        try:
            uuid.UUID(uuid_str)
        except ValueError:
            return Response({'error': 'Invalid UUID'}, status=400)
        
        try:
            user = UserModel.objects.get(uuid=uuid_str)
            access_token = Authentication.get_access_token(user)
            discord_user_data = Discord.get_user_data(access_token, user)
            return Response({'uuid': user.uuid, 'discord_id': str(user.discord_id), 'username': discord_user_data['global_name'], 'avatar': str(discord_user_data['avatar'])})
        
        except UserModel.DoesNotExist:
            return Response({"message": "User not found"}, status=404)

    @action(detail=False, methods=['get'], url_path='groups/(?P<uuid_str>[^/.]+)')
    @jwt_required
    def get_user_groups(self, request, authenticated_user=None, uuid_str=None):
        try:
            uuid.UUID(uuid_str)
        except ValueError:
            return Response({'error': 'Invalid UUID'}, status=400)
        
        try:
            groups = UserModel.objects.get_user_groups(uuid_str)
            groups_data = [{'id': group['group'].id, 'name': group['group'].name, 'profile_link': group['group'].profile_link, 'role': group['role']} for group in groups]
            return Response(groups_data)

        except UserModel.DoesNotExist:
            return Response({"message": "User not found"}, status=404)

class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = GroupModel.objects.all()

    @action(detail=False, methods=['get'], url_path='events/(?P<group_id>\d+)')
    def get_group_events(self, request, group_id=None):
        try:
            events = GroupModel.objects.get_group_events(group_id)
            data = []
            for event in events:
                event_data = EventSerializer(event, context={'request': request}).data
                data.append(event_data)
            return Response(data)
        
        except EventModel.DoesNotExist:
            return Response({"message": "Group not found"}, status=404)
 
class GroupMembersViewSet(viewsets.ModelViewSet):
    serializer_class = GroupMembersSerializer
    queryset = GroupMembersModel.objects.all()

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = EventModel.objects.all()

    @action(detail=False, methods=['get'], url_path='details/(?P<event_id>\d+)')
    def get_event_details(self, request, event_id=None):
        try:
            event_units = EventModel.objects.get_event_details(event_id)
            data = []
            for unit in event_units:
                unit_data = EventUnitSerializer(unit, context={'request': request}).data
                flights_data = EventFlightSerializer(unit.flights.all(), many=True, context={'request': request}).data
                unit_data['flights'] = flights_data
                data.append(unit_data)
            return Response(data)
        
        except EventModel.DoesNotExist:
            return Response({"message": "Event not found"}, status=404)

class EventUnitViewSet(viewsets.ModelViewSet):
    serializer_class = EventUnitSerializer
    queryset = EventUnitModel.objects.all()

class EventFlightViewSet(viewsets.ModelViewSet):
    serializer_class = EventFlightSerializer
    queryset = EventFlightModel.objects.all()
    
class DiscordOAuthView(View):
    def get(self, request):
        return Authentication.authenticate()

@method_decorator(csrf_exempt, name='dispatch')
class DiscordCallbackView(View):
    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return HttpResponseBadRequest('Authorization code missing')
        
        token_data = Discord.get_tokens(code)
        access_token = token_data['access_token']
        refresh_token = token_data['refresh_token']
        expires_in = token_data['expires_in']

        discord_user_data = Discord.get_user_data(access_token)

        if not discord_user_data:
            return HttpResponseBadRequest('Failed to retrieve user information from Discord')
        
        return Authentication.callback(discord_user_data['id'], access_token, refresh_token, expires_in)
    
class ClearCache(View):
    def get(self, request):
        Cache.clear()
        return Response({'status': 'success'})