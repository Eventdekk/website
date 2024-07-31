import requests
import uuid
import jwt
from django.utils import timezone
from django.http import JsonResponse
from django.shortcuts import redirect

from functools import wraps

from config import *
from .models import *
from .cache import *

class Discord:
    client_id = DISCORD_CLIENT_ID
    redirect_uri = REDIRECT_URI
    client_secret = DISCORD_CLIENT_SECRET

    def login_url():
        authorization_base_url = 'https://discord.com/api/oauth2/authorize'
        scope = 'identify'
        return f'{authorization_base_url}?client_id={Discord.client_id}&redirect_uri={Discord.redirect_uri}&response_type=code&scope={scope}'
    
    def get_tokens(code):
        token_url = 'https://discord.com/api/oauth2/token'

        # Payload for token exchange request
        data = {
            'client_id': Discord.client_id,
            'client_secret': Discord.client_secret,
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': Discord.redirect_uri
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        try:
            # Make POST request to exchange authorization code for access token
            response = requests.post(token_url, data=data, headers=headers)
            response.raise_for_status()  # Raise an exception for any HTTP error status codes

            # Parse JSON response
            return response.json()

        except Exception as e:
            print(f'Error retrieving Discord user ID: {e}')
            return None
        
    def get_refresh_tokens(refresh_token):
        data = {
            'client_id': Discord.client_id,
            'client_secret': Discord.client_secret,
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
        }
        headers = {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
        r = requests.post('https://discord.com/api/v8/oauth2/token', data=data, headers=headers)

        if r.status_code == 200:
            tokens = r.json()
            refresh_token = tokens['refresh_token']

            return r.json()
        else:
            print(f"Error: {r.status_code}")
            print(r.json())
            return None

    def get_user_data(access_token, user=None):
        if user:
            cached_data = Cache.get_user_data(user.uuid)
            if cached_data:
                return cached_data
        
        headers = {'Authorization': f'Bearer {access_token}'}
        user_response = requests.get('https://discord.com/api/users/@me', headers=headers)
        user_response.raise_for_status()  # Raise an exception for any HTTP error status codes
        user_data = user_response.json()

        user = UserModel.objects.get(discord_id=user_data['id'])

        if user:
            Cache.save_user_data(user.uuid, user_data['global_name'], user_data['avatar'])

        return user_data

class Authentication:
    def authenticate():
        return redirect(Discord.login_url())
    
    def callback(discord_id, access_token, refresh_token, expires_in):
        try:
            user = UserModel.objects.get(discord_id=discord_id)
            Authentication.save_refresh_token(user, refresh_token)
            Cache.save_access_token(user.uuid, access_token, expires_in)

            response = redirect(f'http://localhost:3000/admin?userId={user.uuid}')
            response.set_cookie('jwt', Authentication.encode_jwt(user), httponly=True, secure=False)
            return response
        except UserModel.DoesNotExist:
            new_uuid = uuid.uuid4()

            new_user = UserModel(discord_id=discord_id, uuid=new_uuid.hex, refresh_token=refresh_token)
            new_user.save()

            Cache.save_access_token(new_user.uuid, access_token, expires_in)

            response = redirect(f'http://localhost:3000/admin?userId={new_user.uuid}')
            response.set_cookie('jwt', Authentication.encode_jwt(new_user), httponly=True, secure=False)
            return response
        
    def encode_jwt(user):
        payload = {
            'uuid': user.uuid,
            'ia': timezone.now().isoformat()
        }

        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
        return token

    def decode_jwt(jwt_token):
        try:
            decoded_token = jwt.decode(jwt_token, JWT_SECRET_KEY, algorithms=["HS256"])
            uuid = decoded_token.get('uuid')
            user = UserModel.objects.get(uuid=uuid)
            return user
        except jwt.InvalidTokenError:
            print("InvalidToken")
            return None
        except UserModel.DoesNotExist:
            print("DoesNotExist")
            return None

    def get_access_token(user):
        access_token = Cache.get_access_token(user.uuid)
        if access_token:
            return access_token

        refresh_tokens = Discord.get_refresh_tokens(user.discord_refresh_token)

        Authentication.save_refresh_token(user, refresh_tokens['refresh_token'])
        Cache.save_access_token(user.uuid, refresh_tokens['access_token'], refresh_tokens['expires_in'])

        return refresh_tokens['access_token']

    def save_refresh_token(user, refresh_token):
        user.discord_refresh_token = refresh_token
        user.save()

def jwt_required(view_func):
    @wraps(view_func)
    def wrapper(self, request, *args, **kwargs):
        jwt_cookie = request.COOKIES.get('jwt')
        authenticated_user = Authentication.decode_jwt(jwt_cookie)
        if authenticated_user:
            return view_func(self, request, authenticated_user, *args, **kwargs)
        return JsonResponse({'error': 'Unauthorized'}, status=401)
        
    return wrapper
        


        
