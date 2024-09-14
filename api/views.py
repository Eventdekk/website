from django.http import HttpResponseBadRequest
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db.models import OuterRef, Subquery, Min

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import *
from .models import *
from .auth import Discord, Authentication, jwt_required
from .cache import Cache

import uuid
import json

from config import *

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    @action(detail=False, methods=['get'], url_path='data/(?P<uuid_str>[^/.]+)')
    @jwt_required
    def get_user_data(self, request, authenticated_user=None, uuid_str=None):
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
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        start_date_subquery = EventUnitModel.objects.filter(event=OuterRef('pk')).order_by('date').values('date')[:1]
        queryset = super().get_queryset().annotate(start_date=Subquery(start_date_subquery))
        return queryset.order_by('start_date')

    @action(detail=False, methods=['post'], url_path='create')
    @jwt_required
    def create_event(self, request, authenticated_user=None):
        try:
            data = request.data.get('data')
            if data:
                try:
                    data = json.loads(data)
                except json.JSONDecodeError as e:
                    print("JSON decode error:", str(e))
                    return Response({"error": "Invalid JSON data"}, status=400)

            if 'thumbnail' in request.FILES:
                data['thumbnail'] = request.FILES['thumbnail']
            else:
                return Response({"error": "No thumbnail provided"}, status=400)

            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Event created successfully"}, status=201)
            else:
                return Response({"error": "You must fill out all fields", "errors": serializer.errors}, status=400)
        except Exception as e:
            print("Unexpected error:", str(e))
            return Response({"error": "An unexpected error occurred"}, status=500)

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