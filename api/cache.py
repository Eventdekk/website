from django.core.cache import cache

class Cache:
    def save_access_token(uuid, access_token, timeout):
        cache.set(uuid, access_token, timeout=timeout)

    def get_access_token(uuid):
        return cache.get(uuid)