from django.contrib import admin
from .models import User, Student, Caretaker, HelpCategory


# Register your models here.
class CaretakerAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'specialisation')
    search_fields = ('user__email', 'specialisation')
    filter_horizontal = ('help_categories',)


@admin.register(HelpCategory)
class HelpCategoryAdmin(admin.ModelAdmin):
    list_display = ('label', 'slug', 'parent')
    search_fields = ('label', 'slug')
    list_filter = ('parent',)
    prepopulated_fields = {'slug': ('label',)}


admin.site.register(User)
admin.site.register(Student)
admin.site.register(Caretaker, CaretakerAdmin)

admin.site.site_header = "CareFree Administration"
admin.site.site_title = "CareFree Admin Page"
admin.site.index_title = "CareFree Admin"