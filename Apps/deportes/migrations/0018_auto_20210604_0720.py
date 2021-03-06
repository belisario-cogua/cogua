# Generated by Django 2.2.3 on 2021-06-04 12:20

from django.db import migrations
import smartfields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('deportes', '0017_deporte_estado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deporte',
            name='imagen',
            field=smartfields.fields.ImageField(default='', max_length=200, upload_to='imagenes/deportes/%Y/%m/%d/', verbose_name='Imagen'),
            preserve_default=False,
        ),
    ]
