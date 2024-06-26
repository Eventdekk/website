from django.urls import path, include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'groupmembers', GroupMembersViewSet)
router.register(r'events', EventViewSet)
router.register(r'eventunits', EventUnitViewSet)
router.register(r'eventflights', EventFlightViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('auth/discord/', DiscordOAuthView.as_view(), name='discord_oauth'),
    path('auth/discord/callback/', csrf_exempt(DiscordCallbackView.as_view()), name='discord_callback'),
    path('clear/', ClearCache.as_view(), name='clear_cache'),
    path('', include(router.urls))
]