from django.contrib import admin
from .models import Plato
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.

class PlatoAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('nombre','precio','descripcion','cantidad','publico','estado','imagen','user_id')}),
	)
	list_display = ('nombre','precio','cantidad','publico','created','modified')

admin.site.register(Plato,PlatoAdmin)