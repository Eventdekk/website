
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import *
from .models import *

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

