from django.urls import path, include

from rest_framework import routers

from .views import *

router = routers.DefaultRouter()

router.register(r'counter', CounterViewSet)
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'groupmembers', GroupMembersViewSet)
router.register(r'events', EventViewSet)
router.register(r'eventjoins', EventJoiningViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls))
]