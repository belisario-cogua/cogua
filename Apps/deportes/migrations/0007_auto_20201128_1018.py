# Generated by Django 2.2.3 on 2020-11-28 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deportes', '0006_auto_20201128_1017'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deporte',
            name='imagen_deporte',
            field=models.ImageField(blank=True, max_length=200, null=True, upload_to='imagenes/deportes/', verbose_name='Imagen'),
        ),
    ]
