from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class VacationDestination(models.Model):
    geolocation = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    imageURL = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    arrival_date = models.DateField()
    departure_date = models.DateField()

    class Meta:
        abstract = True


class PublicVacationDestination(VacationDestination):
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)


class PrivateVacationDestination(VacationDestination):
    pass


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile", to_field="username"
    )
    email = models.CharField(max_length=200)
    role = models.CharField(max_length=100, default="user")
    activation_code = models.CharField(max_length=36)
    activation_expiry_date = models.DateTimeField()
    active = models.BooleanField()