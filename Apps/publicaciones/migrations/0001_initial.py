# Generated by Django 2.2.3 on 2021-05-11 18:05

from django.db import migrations, models
import smartfields.fields
import smartfields.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Publicacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('descripcion', models.TextField(verbose_name='Descripción')),
                ('estado', models.BooleanField(default=True, verbose_name='Estado')),
                ('imagen', smartfields.fields.ImageField(max_length=200, upload_to='imagenes/publicaciones/%Y/%m/%d/', verbose_name='Imagen')),
                ('created', models.DateTimeField(editable=False, verbose_name='Fecha de publicación')),
                ('modified', models.DateTimeField(editable=False, verbose_name='Modificación')),
            ],
            options={
                'ordering': ['nombre'],
            },
            bases=(smartfields.models.SmartfieldsModelMixin, models.Model),
        ),
    ]
