# Generated by Django 4.2.5 on 2024-03-29 08:01

import datetime
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_groupmodel_profile_link'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='eventjoiningmodel',
            name='duration',
        ),
        migrations.RemoveField(
            model_name='eventjoiningmodel',
            name='event',
        ),
        migrations.RemoveField(
            model_name='eventmodel',
            name='date',
        ),
        migrations.AddField(
            model_name='eventjoiningmodel',
            name='arrival_time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='eventjoiningmodel',
            name='departure_time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
        migrations.CreateModel(
            name='EventUnitModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.SmallIntegerField()),
                ('name', models.TextField()),
                ('date', models.DateField(default=datetime.datetime.today)),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='units', to='api.eventmodel')),
            ],
        ),
        migrations.AddField(
            model_name='eventjoiningmodel',
            name='unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='flights', to='api.eventunitmodel'),
        ),
    ]
