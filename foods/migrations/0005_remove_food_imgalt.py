# Generated by Django 4.0.5 on 2022-06-15 15:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0004_food_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='food',
            name='imgAlt',
        ),
    ]