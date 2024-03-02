from django.core.cache import cache

class Cache:
    def set(type, key, value, timeout):
        cache.set(f"{type}{key}", value, timeout=timeout)

    def get(type, key):
        return cache.get(f"{type}{key}")

    def save_access_token(uuid, access_token, timeout):
        Cache.set("at", uuid, access_token, timeout)

    def get_access_token(uuid):
        return Cache.get("at", uuid)

    def save_user_data(uuid, global_name, avatar):
        Cache.set("ud", uuid, {'global_name': global_name, 'avatar': avatar}, 60 * 15)

    def get_user_data(uuid):
        return Cache.get("ud", uuid)
    
    def clear():
        cache.clear()