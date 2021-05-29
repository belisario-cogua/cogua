from django.contrib import admin
from .models import Publicacion
# Register your models here.

class PublicacionAdmin(admin.ModelAdmin):
	search_fields = ['nombre']
	list_display = ('nombre','descripcion','estado','imagen','created')

admin.site.register(Publicacion,PublicacionAdmin)