from django.db import models


class Client(models.Model):
    # id is generated automatically
    logo = models.TextField()
    name = models.CharField(max_length=200, unique=True)

