from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ExportActionModelAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Permission
from .models import Usuario
from .forms import RegistrarUsuarioForm

# Register your models here.
class UsuarioResource(resources.ModelResource):
	class Meta:
		model = Usuario

'''class UsuarioAdmin(ImportExportModelAdmin,admin.ModelAdmin):
	#form = RegistrarUsuarioForm
	search_fields = ['nombres','apellidos']
	list_display = ('nombres','apellidos', 'email','is_staff','is_superuser')
	resource_class = UsuarioResource'''
class UsuarioAdmin(ExportActionModelAdmin,ImportExportModelAdmin,BaseUserAdmin):
	#form = RegistrarUsuarioForm
	search_fields = ['nombres','apellidos']
	list_display = ('nombres','apellidos', 'email','image_tag','is_staff','is_superuser','created')
	#list_filter = ('is_staff',)
	list_display_links = ['image_tag','nombres']
	fieldsets = (
		('PRINCIPAL',{'fields':('email','password',)}),
		('INFORMACIÓN',{'fields':('nombres','apellidos','solicitud','notificacion','imagen',)}),
		('PERMISOS',{'fields':('is_active','is_staff','is_superuser',)}),
    	('FECHAS', {'fields': ('last_login',)}),
	)
	add_fieldsets = ((None, {'classes': ('wide',), 'fields': ('email', 'password1', 'password2')}),)
	ordering = ('email',)
	resource_class = UsuarioResource

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Permission)
