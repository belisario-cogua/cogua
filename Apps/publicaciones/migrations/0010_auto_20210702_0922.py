# Generated by Django 2.2.3 on 2021-07-02 14:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('publicaciones', '0009_auto_20210623_1723'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comentario',
            options={'ordering': ['created'], 'verbose_name': 'Comentario', 'verbose_name_plural': 'Comentarios'},
        ),
    ]
