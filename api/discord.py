from django.shortcuts import redirect
import requests
import uuid

from config import *
from .models import *

class Discord:
    def authenticate():
        authorization_base_url = 'https://discord.com/api/oauth2/authorize'
        client_id = DISCORD_CLIENT_ID
        redirect_uri = REDIRECT_URI 
        scope = 'identify'
        authorization_url = f'{authorization_base_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}'
        
        return redirect(authorization_url)
    
    def callback(discord_id):
        try:
            user = UserModel.objects.get(discord_id=discord_id)
            
            return redirect(f'http://localhost:3000/admin?userId={user.uuid}')
        except UserModel.DoesNotExist:
            new_uuid = uuid.uuid4()
            new_user = UserModel(discord_id=discord_id, uuid=new_uuid.hex)
            new_user.save()

            return redirect(f'http://localhost:3000/admin?userId={new_user.uuid}')
        
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

            print(user_data)

            return discord_id
        except Exception as e:
            print(f'Error retrieving Discord user ID: {e}')
            return None
