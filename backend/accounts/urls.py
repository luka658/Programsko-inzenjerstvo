from django.contrib import admin
from django.urls import path
from .views import RegisterView, LoginView, deleteUserView, logoutView, requestPasswordResetView, resetPasswordConfirmView, refresh_access_token_view


urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('register/', RegisterView.as_view(), name="register"),
    path('logout/', logoutView, name="logout-user"),
    path('delete/', deleteUserView, name="delete-user"),
    path('forgot-password/', requestPasswordResetView, name="forgot-password"),
    path('reset-password/<uidb64>/<token>/', resetPasswordConfirmView, name="reset-password"),
    path('refresh/', refresh_access_token_view, name="refresh_token"),

]
