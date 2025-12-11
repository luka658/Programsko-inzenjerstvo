from django.urls import path
from .views import (caretaker_by_id, search_caretakers, my_profile, change_password, my_caretaker_profile, my_student_profile, help_categories)


urlpatterns = [
    path('caretakers/help-categories', help_categories, name='help_categories'),
    path('caretakers/search/', search_caretakers, name='search_caretakers'),
    path('me/', my_profile, name='my_profile'),
    path('me/change-password/', change_password, name='change_password'),
    path('me/caretaker/', my_caretaker_profile, name='my_caretaker_profile'),
    path('me/student/', my_student_profile, name='my_student_profile'),
    path('caretakers/caretaker/<id>', caretaker_by_id, name='caretaker/id'),
    # path('caretakers/caretaker/<slug>', caretaker_by_slug, name='caretaker/slug'),
]