from django.contrib import admin
from .models import Publicacion, Comentario
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.

class PublicacionAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('nombre','descripcion','estado','imagen','usuario')}),
	)
	list_display = ('nombre','estado','image_tag','created')

class ComentarioAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['comentario']
	fieldsets = (
		('INFORMACIÓN',{'fields':('comentario','usuario','publicacion','created')}),
	)
	list_display = ('comentario','usuario','publicacion','created')

admin.site.register(Publicacion,PublicacionAdmin)
admin.site.register(Comentario,ComentarioAdmin)