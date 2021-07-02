# Generated by Django 2.2.3 on 2021-07-02 01:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notificaciones', '0007_auto_20210701_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noti',
            name='deporte',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='reservas.ReservaDeporte', verbose_name='Deporte reservado'),
        ),
        migrations.AlterField(
            model_name='noti',
            name='hotel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='reservas.ReservaHotel', verbose_name='Hotel reservado'),
        ),
        migrations.AlterField(
            model_name='noti',
            name='plato',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='reservas.ReservaPlato', verbose_name='Plato Típico reservado'),
        ),
        migrations.AlterField(
            model_name='noti',
            name='turismo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='reservas.ReservaTurismo', verbose_name='Lugar Turístico reservado'),
        ),
    ]