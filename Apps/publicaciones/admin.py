from django.contrib import admin
from .models import Publicacion
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.

class PublicacionAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('nombre','descripcion','estado','imagen')}),
	)
	list_display = ('nombre','estado','image_tag','created')

admin.site.register(Publicacion,PublicacionAdmin)