# Generated by Django 2.2.3 on 2021-06-05 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0009_auto_20210511_1305'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='estado',
            field=models.BooleanField(default=True, verbose_name='Estado'),
        ),
    ]
