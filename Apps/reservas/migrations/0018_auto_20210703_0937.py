# Generated by Django 2.2.3 on 2021-07-03 14:37

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservas', '0017_auto_20210703_0927'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservaplato',
            name='cantidad_plato',
            field=models.SmallIntegerField(default=1, verbose_name='Cantidad (platos típicos)'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='reservadeporte',
            name='costo',
            field=models.DecimalField(decimal_places=2, max_digits=9, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))], verbose_name='Costo de la reserva'),
        ),
        migrations.AlterField(
            model_name='reservahotel',
            name='costo',
            field=models.DecimalField(decimal_places=2, max_digits=9, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))], verbose_name='Costo de la reserva'),
        ),
        migrations.AlterField(
            model_name='reservaturismo',
            name='costo',
            field=models.DecimalField(decimal_places=2, max_digits=9, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))], verbose_name='Costo de la reserva'),
        ),
    ]
