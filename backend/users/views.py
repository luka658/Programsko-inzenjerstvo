from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def caretakers(request):
    res = request.GET.get('name', 'x')
    return HttpResponse(f"caretaker page: {res}")