from django.urls import path
from .views import search_caretakers


urlpatterns = [
    path('caretakers/search/', search_caretakers, name='search_caretakers'),

]