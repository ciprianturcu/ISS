# Generated by Django 4.1.7 on 2023-05-24 13:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_remove_publicvacationdestination_added_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='privatevacationdestination',
            name='added_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
