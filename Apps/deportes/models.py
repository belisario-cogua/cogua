from django.db import models
from django.utils import timezone
from Apps.usuarios.models import Usuario
from smartfields import fields
from django.core.exceptions import ValidationError 

# Create your models here.
class Deporte(models.Model):
	def validate_image(fieldfile_obj): 
		filesize = fieldfile_obj.file.size 
		megabyte_limit = 1.0 
		if filesize > megabyte_limit*1024*1024: 
			raise ValidationError("El tamaño maximo de la imagen debe ser %sMB" % str(megabyte_limit))

	nombre = models.CharField(max_length = 200, blank = False, null = False)
	precio = models.CharField('Precio',max_length = 200, blank = False, null = False)
	descripcion = models.TextField('Descripcion',blank=True, null=True)
	#estado = models.BooleanField('No Reservado/Reservado',default = False)
	cantidad = models.SmallIntegerField('Cantidad', default = 1)
	estado = models.BooleanField('Estado',default = True)
	imagen = fields.ImageField('Imagen', upload_to='imagenes/deportes/%Y/%m/%d/', max_length=200, blank = False, null = False, validators=[validate_image])
	#fecha_creacion = models.DateField('Fecha de Creación', auto_now = False, auto_now_add = True)
	user_id = models.ForeignKey(Usuario, on_delete=models.CASCADE,blank = True,null = True)
	created = models.DateTimeField('Fecha de publicacion', editable=False, null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', editable=False, null=True, blank=True)

	def natural_key(self):
		return self.nombre

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(Deporte, self).save(*args, **kwargs)

	class Meta:
		verbose_name = 'Deporte'
		verbose_name_plural = 'Deportes'
		#ordering -> ordena por nombre alfabeticamente
		ordering = ['nombre']

	def __str__(self):
		return '{}'.format(self.nombre)