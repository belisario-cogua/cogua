from django.contrib import admin
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
from .models import Deporte
# Register your models here.

class DeporteAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('nombre','precio','descripcion','publico','estado','imagen')}),
	)
	list_display = ('nombre','publico','precio','created','modified')

admin.site.register(Deporte,DeporteAdmin)