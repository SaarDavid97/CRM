from django.urls import path
from .views import TaskList, TaskDetail, TasksPrediction, HistoryList

urlpatterns = [
    path('tasks/', TaskList.as_view()),
    path('tasks/<int:pk>/', TaskDetail.as_view()),
    path('tasks/prediction/', TasksPrediction.as_view()),
    path('tasks/history/', HistoryList.as_view()),
]
