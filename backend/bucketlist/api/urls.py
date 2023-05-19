from django.urls import path
from .views import PrivateVacationDestinationListCreateView, PrivateVacationDestinationInfo, \
    PublicVacationDestinationInfo, PublicVacationDestinationListCreateView,UserRegistrationView, UserActivationView, \
    LoginView, UserDetail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("activate/", UserActivationView.as_view(), name="activate-user"),
    path("profile/<str:id>/", UserDetail.as_view(), name="profile"),
    path("privatedestination/", PrivateVacationDestinationListCreateView.as_view(), name="privatedestination"),
    path("privatedestination/<int:id>/", PrivateVacationDestinationInfo.as_view()),
    path("publicdestination/", PublicVacationDestinationListCreateView.as_view(), name="publicdestination"),
    path("publicdestination/<int:id>/", PublicVacationDestinationInfo.as_view()),
]
