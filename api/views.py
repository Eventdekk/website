
from django.shortcuts import render

from django.shortcuts import redirect
from django.http import HttpResponseBadRequest, HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import *
from .models import *

import requests

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

    @action(detail=False, methods=['get'], url_path='get_user_id/(?P<uuid_str>[^/.]+)')
    def get_user_id(self, request, uuid_str=None):
        # Check if the UUID is valid
        try:
            uuid_obj = uuid.UUID(uuid_str)
        except ValueError:
            return Response({'error': 'Invalid UUID'}, status=400)
        
        # Query the User object based on the UUID
        user = UserModel.objects.get(uuid=uuid_str)

        # Return the User's ID
        return Response({'uuid': user.uuid, 'discord_id': user.discord_id})

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
        # Construct Discord authorization URL
        authorization_base_url = 'https://discord.com/api/oauth2/authorize'
        client_id = DISCORD_CLIENT_ID
        redirect_uri = REDIRECT_URI 
        scope = 'identify'
        authorization_url = f'{authorization_base_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}'
        
        # Redirect user to Discord authorization URL
        return redirect(authorization_url)




@method_decorator(csrf_exempt, name='dispatch')
class DiscordCallbackView(View):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        if not code:
            return HttpResponseBadRequest('Authorization code missing')

        discord_user_id = self.get_discord_user_id(code)

        print(discord_user_id)

        if not discord_user_id:
            return HttpResponseBadRequest('Failed to retrieve user information from Discord')
        
        try:
            user = UserModel.objects.get(discord_id=discord_user_id)
            
            return redirect(f'http://localhost:3000/admin?userId={user.uuid}')
        except UserModel.DoesNotExist:
            new_uuid = uuid.uuid4()
            new_user = UserModel(discord_id=discord_user_id, uuid=new_uuid.hex)
            new_user.save()

            return redirect(f'http://localhost:3000/admin?userId={new_user.uuid}')
        
        return HttpResponse('Authentication successful')
    
    def get_discord_user_id(self, code):
        token_url = 'https://discord.com/api/oauth2/token'
        
        client_id = DISCORD_CLIENT_ID
        client_secret = DISCORD_CLIENT_SECRET
        redirect_uri = REDIRECT_URI

        # Payload for token exchange request
        payload = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': redirect_uri
        }

        try:
            # Make POST request to exchange authorization code for access token
            response = requests.post(token_url, data=payload)
            response.raise_for_status()  # Raise an exception for any HTTP error status codes

            # Parse JSON response
            token_data = response.json()

            # Extract Discord user ID from token data
            access_token = token_data['access_token']
            headers = {'Authorization': f'Bearer {access_token}'}
            user_response = requests.get('https://discord.com/api/users/@me', headers=headers)
            user_response.raise_for_status()  # Raise an exception for any HTTP error status codes
            user_data = user_response.json()
            discord_id = user_data['id']

            return discord_id
        except Exception as e:
            print(f'Error retrieving Discord user ID: {e}')
            return None
