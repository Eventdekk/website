# Generated by Django 4.2.5 on 2024-06-22 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventunitmodel',
            name='arrival',
            field=models.CharField(blank=True, max_length=4),
        ),
        migrations.AddField(
            model_name='eventunitmodel',
            name='departure',
            field=models.CharField(blank=True, max_length=4),
        ),
    ]
