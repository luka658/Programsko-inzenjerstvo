

from django.urls import path
from . import views


urlpatterns = [
    path('caretakers/', views.caretakers, name='caretakers')
]