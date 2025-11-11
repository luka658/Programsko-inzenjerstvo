from django.urls import path
from .views import caretakerById, caretakerBySlug, search_caretakers


urlpatterns = [
    path('caretakers/search/', search_caretakers, name='search_caretakers'),
    path('caretakers/caretaker/<id>', caretakerById, name='caretaker/id'),
    # path('caretakers/caretaker/<slug>', caretakerBySlug, name='caretaker/slug'),

]