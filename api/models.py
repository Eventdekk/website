from django.db import models

class CounterModel(models.Model):
    count = models.IntegerField(default=0)

    def __str__(self):
        return "Counter"