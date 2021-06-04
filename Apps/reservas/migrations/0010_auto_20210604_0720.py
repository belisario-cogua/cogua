# Generated by Django 2.2.3 on 2021-06-04 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservas', '0009_auto_20210511_1305'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservadeporte',
            name='confirmar',
            field=models.BooleanField(default=False, verbose_name='Confirmar'),
        ),
        migrations.AddField(
            model_name='reservadeporte',
            name='estado',
            field=models.BooleanField(default=True, verbose_name='Estado'),
        ),
        migrations.AddField(
            model_name='reservadeporte',
            name='visita',
            field=models.BooleanField(default=False, verbose_name='Visita'),
        ),
        migrations.AlterField(
            model_name='reservadeporte',
            name='cantidad_dias',
            field=models.SmallIntegerField(default=7, verbose_name='Tiempo de espera'),
        ),
    ]
