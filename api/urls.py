from django.urls import path, include

from rest_framework import routers

from .views import *

router = routers.DefaultRouter()

router.register(r'counter', CounterViewSet)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('', include(router.urls))
]