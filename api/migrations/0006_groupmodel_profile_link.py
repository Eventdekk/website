# Generated by Django 4.2.5 on 2024-03-02 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_delete_countermodel_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupmodel',
            name='profile_link',
            field=models.URLField(default='https://sea2.discourse-cdn.com/infiniteflight/user_avatar/community.infiniteflight.com/qatarivirtual/96/1210662_2.png'),
            preserve_default=False,
        ),
    ]
