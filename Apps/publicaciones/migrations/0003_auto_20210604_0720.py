# Generated by Django 2.2.3 on 2021-06-04 12:20

from django.db import migrations
import smartfields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('publicaciones', '0002_auto_20210520_0953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publicacion',
            name='imagen',
            field=smartfields.fields.ImageField(default='', max_length=200, upload_to='imagenes/publicaciones/%Y/%m/%d/', verbose_name='Imagen'),
            preserve_default=False,
        ),
    ]
