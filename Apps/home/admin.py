from django.contrib import admin
from .models import Imagehome
# Register your models here.

class ImagehomeAdmin(admin.ModelAdmin):
	search_fields = ['nombre']
	fieldsets = (
		('INFORMACIÓN',{'fields':('nombre','imagen','user_id','modified','created')}),
	)
	list_display = ('nombre','modified','user_id','image_tag')

	
	
admin.site.register(Imagehome,ImagehomeAdmin)
