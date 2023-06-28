from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
