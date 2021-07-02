from django.contrib import admin
from .models import Notificacion
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
# Register your models here.

class NotificacionAdmin(ExportActionModelAdmin,ImportExportModelAdmin,admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('tipo','actor','destinatario','comentario','publicacion','solicitud','notificacion_num','enviado','reserva_hotel','reserva_deporte','reserva_turismo','reserva_plato')}),
	)
	list_display = ('actor','destinatario','tipo','modified')

admin.site.register(Notificacion,NotificacionAdmin)
