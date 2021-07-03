# Generated by Django 2.2.3 on 2021-07-03 14:27

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservas', '0016_auto_20210701_0930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservaplato',
            name='costo',
            field=models.DecimalField(decimal_places=2, max_digits=9, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))], verbose_name='Costo de la reserva'),
        ),
    ]
