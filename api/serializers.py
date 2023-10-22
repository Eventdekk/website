from rest_framework import serializers

from .models import *

class CounterSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = CounterModel
        fields = ('id', 'count')