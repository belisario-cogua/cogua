# Generated by Django 2.2.3 on 2021-06-23 22:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('publicaciones', '0004_auto_20210621_2131'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='publicacion',
            options={'ordering': ['-created'], 'verbose_name': 'Publicacion', 'verbose_name_plural': 'Publicaciones'},
        ),
        migrations.AddField(
            model_name='publicacion',
            name='usuario',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Comentario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comentario', models.CharField(max_length=200)),
                ('created', models.DateTimeField(editable=False, verbose_name='Fecha de publicación')),
                ('modified', models.DateTimeField(editable=False, verbose_name='Modificación')),
                ('publicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='publicaciones.Publicacion')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Comentario',
                'verbose_name_plural': 'Comentarios',
                'ordering': ['-created'],
            },
        ),
    ]