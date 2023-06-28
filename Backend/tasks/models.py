from django.db import models


class Task(models.Model):
    # id is generated automatically
    title = models.CharField(max_length=200)
    client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, to_field='name')
    category = models.CharField(max_length=200)
    status = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title', 'client', 'category', 'status', 'date']


class History(models.Model):
    # id is generated automatically
    client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, to_field='name')
    category = models.CharField(max_length=200)
    date = models.DateTimeField()

    class Meta:
        ordering = ['client', 'category', 'date']

