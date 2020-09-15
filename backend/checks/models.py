from django.db import models
from django.conf import settings

# Create your models here.
class Check(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.IntegerField()
    content = models.TextField()
    place = models.CharField(max_length=30)
    stufflist = models.ChasrField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now= True)
    

class Stuff(models.Model):
    stuffname = models.CharField(max_length=10)
    check = models.ForeignKey(Check, on_delete=models.CASCADE)

class recommand(models.Model):
    place = models.CharField(max_length=30)
    plusstuff = models.CharField(max_length=30)