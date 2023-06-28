# Generated by Django 4.1 on 2023-06-25 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_remove_client_id_alter_client_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='client',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]