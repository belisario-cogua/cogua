from django.db import models
from django.utils import timezone
from smartfields import fields
# Create your models here.

class Publicacion(models.Model):
	nombre = models.CharField(max_length = 200)
	descripcion = models.TextField('Descripción')
	estado = models.BooleanField('Estado',default = True)
	imagen = fields.ImageField('Imagen', upload_to='imagenes/publicaciones/%Y/%m/%d/', max_length=200, blank = True, null = True)
	created = models.DateTimeField('Fecha de publicación', editable=False)
	modified = models.DateTimeField('Modificación', editable=False)

	def natural_key(self):
		return self.nombre
		
	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(Publicacion, self).save(*args, **kwargs)

	class Meta:
		verbose_name = 'Publicacion'
		verbose_name_plural = 'Publicaciones'
		#ordering -> ordena por nombre alfabeticamente
		ordering = ['nombre']

	def __str__(self):
		return '{}'.format(self.nombre)