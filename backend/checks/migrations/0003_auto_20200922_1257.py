# Generated by Django 2.1.15 on 2020-09-22 03:57

import checks.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checks', '0002_checkimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=checks.models.upload_path),
        ),
    ]