# Generated by Django 2.2.3 on 2021-07-02 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deportes', '0019_auto_20210621_2131'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='deporte',
            name='cantidad',
        ),
        migrations.AddField(
            model_name='deporte',
            name='publico',
            field=models.BooleanField(default=True, verbose_name='Público'),
        ),
        migrations.AlterField(
            model_name='deporte',
            name='descripcion',
            field=models.TextField(default='', verbose_name='Descripcion'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='deporte',
            name='nombre',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
