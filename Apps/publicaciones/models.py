from django.db import models
from django.utils import timezone
from smartfields import fields
from django.utils.safestring import mark_safe
from Apps.usuarios.models import Usuario
# Create your models here.

class Publicacion(models.Model):
	nombre = models.CharField(max_length = 200)
	descripcion = models.TextField('Descripción')
	estado = models.BooleanField('Estado (Eliminación lógica)',default = True)
	imagen = fields.ImageField('Imagen', upload_to='imagenes/publicaciones/%Y/%m/%d/', max_length=200, blank = False, null = False)
	usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE,blank = True,null = True)
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
		ordering = ['-created']

	def __str__(self):
		return '{}'.format(self.nombre)

	def image_tag(self):
		if self.imagen:
			return mark_safe('<img src="/media/%s" width=50 height=50 />' %(self.imagen))
		else:
			return mark_safe('<img src="/static/personal/imagen/usuario.png" width=50 height=50 />')

	image_tag.short_description = 'IMAGEN'

class Comentario(models.Model):
	publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
	usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
	comentario = models.TextField('Descripcion')
	created = models.DateTimeField('Fecha de publicación')

	def natural_key(self):
		return self.comentario
		
	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		return super(Comentario, self).save(*args, **kwargs)

	class Meta:
		verbose_name = 'Comentario'
		verbose_name_plural = 'Comentarios'
		#ordering -> ordena por nombre alfabeticamente
		ordering = ['created']

	def __str__(self):
		return '{}'.format(self.comentario)