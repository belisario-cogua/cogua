# Generated by Django 2.2.3 on 2021-07-02 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notificaciones', '0006_auto_20210701_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='noti',
            name='enviado',
            field=models.BooleanField(default=False, verbose_name='Enviado '),
        ),
        migrations.AddField(
            model_name='noti',
            name='fecha',
            field=models.DateField(blank=True, null=True, verbose_name='Fecha inicial de reserva'),
        ),
        migrations.AddField(
            model_name='noti',
            name='notificacion_num',
            field=models.SmallIntegerField(default=0, verbose_name='Notificacion'),
        ),
    ]
