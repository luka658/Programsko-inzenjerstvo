from django.contrib import admin
from .models import *

# Register your models here.
class CaretakerAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'specialisation')
    search_fields = ('user__email', 'specialisation')
    filter_horizontal = ('help_categories',)

admin.site.register(User)
admin.site.register(Student)
admin.site.register(Caretaker, CaretakerAdmin)
admin.site.register(HelpCategory)