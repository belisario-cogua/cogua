from django.contrib import admin
from .models import ReservaDeporte, ReservaHotel, ReservaPlato, ReservaTurismo
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.
class ReservaDeporteAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['usuario']
	fieldsets = (
		('INFORMACIÓN',{'fields':('fecha_inicial','fecha_final','cantidad_dias','costo','estado','confirmar','activado','visita','deporte','usuario')}),
	)
	list_display = ('usuario','deporte','created','modified')

class ReservaHotelAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['usuario']
	fieldsets = (
		('INFORMACIÓN',{'fields':('fecha_inicial','fecha_final','cantidad_dias','costo','estado','confirmar','activado','visita','hotel','usuario')}),
	)
	list_display = ('usuario','hotel','created','modified')

class ReservaPlatoAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['usuario']
	fieldsets = (
		('INFORMACIÓN',{'fields':('fecha_inicial','fecha_final','cantidad_dias','costo','estado','confirmar','activado','visita','plato','usuario')}),
	)
	list_display = ('usuario','plato','created','modified')

class ReservaTurismoAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['usuario']
	fieldsets = (
		('INFORMACIÓN',{'fields':('fecha_inicial','fecha_final','cantidad_dias','costo','estado','confirmar','activado','visita','turismo','usuario')}),
	)
	list_display = ('usuario','turismo','created','modified')
	
admin.site.register(ReservaTurismo, ReservaTurismoAdmin)
admin.site.register(ReservaDeporte, ReservaDeporteAdmin)
admin.site.register(ReservaHotel, ReservaHotelAdmin)
admin.site.register(ReservaPlato, ReservaPlatoAdmin)
