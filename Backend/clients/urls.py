from django.urls import path
from .views import ClientList, ClientDetail

urlpatterns = [
    path('clients/', ClientList.as_view()),
    path('clients/<int:pk>/', ClientDetail.as_view()),
]
