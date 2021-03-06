from django.db import models
from django.utils import timezone
from Apps.usuarios.models import Usuario
from smartfields import fields
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal
# Create your models here.

class Hotel(models.Model):	
	nombre = models.CharField(max_length = 200, blank = False, null = False,unique=True)
	precio = models.DecimalField('Precio', blank = False, null = False, max_digits=9, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
	descripcion = models.TextField('Descripcion',blank=False, null=False)
	publico = models.BooleanField('Público',default = True)
	estado = models.BooleanField('Estado (Eliminación lógica)',default = True)
	imagen = fields.ImageField('Imagen', upload_to='imagenes/cabañas/%Y/%m/%d/', max_length=200, blank = False, null = False)
	user_id = models.ForeignKey(Usuario, on_delete=models.CASCADE,blank = True,null = True)
	created = models.DateTimeField('Fecha de publicacion', editable=False, null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', editable=False, null=True, blank=True)

	def natural_key(self):
		return self.nombre
		
	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(Hotel, self).save(*args, **kwargs)

	class Meta:
		verbose_name = 'Hotel'
		verbose_name_plural = 'Cabañas'
		#ordering -> ordena por nombre alfabeticamente
		ordering = ['nombre']

	def __str__(self):
		return '{}'.format(self.nombre)