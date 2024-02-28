from django.http import HttpResponseBadRequest
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import *
from .models import *
from .auth import Discord, Authentication

import uuid

from config import *

class CounterViewSet(viewsets.ModelViewSet):
    queryset = CounterModel.objects.all()
    serializer_class = CounterSerializer

    def update(self, request, *args, **kwards):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        old_count = instance.count
        new_count = serializer.validated_data.get('count', None)

        if new_count <= old_count:
            new_count = old_count + 1

        if new_count is not None:
            if new_count > 10:
                new_count = 0

        instance.count = new_count
        instance.save()
        
        return Response({"message": "Data updated successfully"})

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()

    @action(detail=False, methods=['get'], url_path='get_user_data/(?P<uuid_str>[^/.]+)')
    def get_user_data(self, request, uuid_str=None):
        try:
            uuid.UUID(uuid_str)
        except ValueError:
            return Response({'error': 'Invalid UUID'}, status=400)
                
        user = UserModel.objects.get(uuid=uuid_str)
        access_token = Authentication.get_access_token(user)

        discord_user_data = Discord.get_user_data(access_token)

        return Response({'uuid': user.uuid, 'discord_id': user.discord_id, 'username': discord_user_data['username']})

# curl -X POST https://discord.com/api/oauth2/token \ -d "client_id=1209503110159147088" \ -d "client_secret=_rMsrFcFfOs78p4F0HFbemAbl-HKbDsK" \ -d "grant_type=refresh_token" \ -d "refresh_token=urVpOrKJrCcAuVVFTilVwlarXAgpPl"

class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = GroupModel.objects.all()

class GroupMembersViewSet(viewsets.ModelViewSet):
    serializer_class = GroupMembersSerializer
    queryset = GroupMembersModel.objects.all()

class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = EventModel.objects.all()

class EventJoiningViewSet(viewsets.ModelViewSet):
    serializer_class = EventJoiningSerializer
    queryset = EventJoiningModel.objects.all()
    
class DiscordOAuthView(View):
    def get(self, request, *args, **kwargs):
        return Authentication.authenticate()

@method_decorator(csrf_exempt, name='dispatch')
class DiscordCallbackView(View):
    def get(self, request, *args, **kwargs):
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