# Generated by Django 2.2.3 on 2021-03-14 14:11

from django.db import migrations
import smartfields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('platos', '0003_auto_20210314_0854'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plato',
            name='imagen',
            field=smartfields.fields.ImageField(blank=True, max_length=200, null=True, upload_to='imagenes/platos_tipicos/%Y/%m/%d/', verbose_name='Imagen'),
        ),
    ]
