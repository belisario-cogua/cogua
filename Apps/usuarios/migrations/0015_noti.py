# Generated by Django 2.2.3 on 2021-07-01 22:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0014_auto_20210621_2131'),
    ]

    operations = [
        migrations.CreateModel(
            name='Noti',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de publicacion')),
                ('modified', models.DateTimeField(blank=True, editable=False, null=True, verbose_name='Fecha de modificacion')),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Notificacion',
                'verbose_name_plural': 'Notificaciones',
            },
        ),
    ]
