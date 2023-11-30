# Generated by Django 4.2.5 on 2023-11-30 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventJoiningModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_id', models.BigIntegerField()),
                ('group_id', models.BigIntegerField()),
                ('departure', models.CharField(max_length=4)),
                ('arrival', models.CharField(max_length=4)),
                ('duration', models.DurationField()),
                ('est_pilots', models.SmallIntegerField()),
                ('act_pilots', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='EventModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_id', models.BigIntegerField()),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('ifc_link', models.URLField()),
                ('thumbnail', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='GroupMembersModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_id', models.BigIntegerField()),
                ('user_id', models.BigIntegerField()),
                ('role', models.SmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GroupModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('owner_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discord', models.CharField(max_length=100)),
            ],
        ),
    ]