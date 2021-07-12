from django.db import models
from django.utils import timezone
from smartfields import fields
from django.utils.safestring import mark_safe
from Apps.usuarios.models import Usuario

# Create your models here.
class Imagehome(models.Model):
	nombre = models.CharField('Tipo',max_length = 200, blank = True, null = True)
	imagen = fields.ImageField('Imagen', upload_to='imagenes/home/%Y/%m/%d/', max_length=200, blank = False, null = False)
	user_id = models.ForeignKey(Usuario, on_delete=models.CASCADE,blank = True,null = True,verbose_name = "Usuario")
	created = models.DateTimeField('Fecha de publicacion', null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', null=True, blank=True)

	def natural_key(self):
		return self.nombre
		
	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(Imagehome, self).save(*args, **kwargs)

	class Meta:
		verbose_name = 'Imagehome'
		verbose_name_plural = 'Imagenes de home'
		ordering = ['-modified']

	def image_tag(self):
		if self.imagen:
			return mark_safe('<img src="/media/%s" width=50 height=50 />' %(self.imagen))
		else:
			return mark_safe('<img src="/static/personal/imagen/usuario.png" width=50 height=50 />')

	image_tag.short_description = 'IMAGEN'
