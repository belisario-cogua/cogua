from django.contrib import admin
from .models import Turismo
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.

class TurismoAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('nombre','precio','descripcion','publico','estado','imagen')}),
	)
	list_display = ('nombre','publico','precio','created','modified')

admin.site.register(Turismo,TurismoAdmin)