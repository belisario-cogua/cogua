# Generated by Django 2.2.3 on 2021-03-14 13:54

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turismos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='turismo',
            name='imagen',
            field=cloudinary.models.CloudinaryField(default='', max_length=255, verbose_name='Imagen'),
            preserve_default=False,
        ),
    ]
