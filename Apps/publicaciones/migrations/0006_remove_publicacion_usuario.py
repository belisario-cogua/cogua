# Generated by Django 2.2.3 on 2021-06-23 22:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('publicaciones', '0005_auto_20210623_1709'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='publicacion',
            name='usuario',
        ),
    ]
