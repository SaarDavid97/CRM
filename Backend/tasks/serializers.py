from rest_framework import serializers
from .models import Task, History


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'client', 'category', 'status', 'date']


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'client', 'category', 'date']

