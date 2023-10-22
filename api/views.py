
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



