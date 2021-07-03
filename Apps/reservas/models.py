from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from Apps.deportes.models import Deporte
from Apps.hoteles.models import Hotel
from Apps.platos.models import Plato
from Apps.turismos.models import Turismo
from Apps.usuarios.models import Usuario
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal

# Modelo de reserva para deportes
class ReservaDeporte(models.Model):
	deporte = models.ForeignKey(Deporte, on_delete=models.CASCADE, verbose_name = "Deporte reservado")
	usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name = "Reservado por")
	fecha_inicial = models.DateField('Fecha inicial de reserva', blank = False, null = False)
	fecha_final = models.DateField('Fecha final de reserva', blank = False, null = False)
	cantidad_dias = models.SmallIntegerField('Tiempo de espera (En días)', default = 1)
	costo = models.DecimalField('Costo de la reserva', blank = False, null = False, max_digits=9, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
	estado = models.BooleanField('Estado (Eliminación lógica)',default = True)
	#el campo confirmar es validado si el administrador lo solicita, esto quiere decir que el cliente a llegado a la visita
	confirmar = models.BooleanField('Confirmar (Confirmación de reserva)',default = False)
	#activado=este campo se activara cuando se haya aceptado o cancelado la reserva
	activado = models.BooleanField('Activado (Cancelado o Aceptado)',default = False)
	#el campo visita es validado automaticamente por el sistema cuando el tiempo de reserva terminó,
	#esto quiere decir que el cliente no a llegado a a la visita
	visita = models.BooleanField('Visita (Turismo Visitado)',default = True)
	created = models.DateTimeField('Creado', editable=False, null=True,blank=True)
	modified = models.DateTimeField('Modificado', editable=False, null=True, blank=True)

	def natural_key(self):
		return f'{self.deporte}'

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.localtime()
		self.modified = timezone.localtime()
		return super(ReservaDeporte, self).save(*args, **kwargs)

	class Meta:
		verbose_name_plural = 'Deportes'
		verbose_name = 'la reserva'
	def __str__(self):
		return '{}'.format(self.deporte)

# Modelo de reserva para platos tipicos
class ReservaHotel(models.Model):
	hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, verbose_name = "Cabaña reservado")
	usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name = "Reservado por")
	fecha_inicial = models.DateField('Fecha inicial de reserva', blank = False, null = False)
	fecha_final = models.DateField('Fecha final de reserva', blank = False, null = False)
	cantidad_dias = models.SmallIntegerField('Tiempo de espera (En días)', default = 1)
	costo = models.DecimalField('Costo de la reserva', blank = False, null = False, max_digits=9, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
	estado = models.BooleanField('Estado (Eliminación lógica)',default = True)
	confirmar = models.BooleanField('Confirmar (Confirmación de reserva)',default = False)
	activado = models.BooleanField('Activado (Cancelado o Aceptado)',default = False)
	visita = models.BooleanField('Visita (Turismo Visitado)',default = True)
	created = models.DateTimeField('Fecha de publicacion', editable=False, null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', editable=False, null=True, blank=True)

	def natural_key(self):
		return f'{self.hotel}'

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(ReservaHotel, self).save(*args, **kwargs)

	class Meta:
		verbose_name_plural = 'Cabañas'
		verbose_name = 'la reserva'
	def __str__(self):
		return '{}'.format(self.hotel)

# Modelo de reserva para platos tipicos
class ReservaPlato(models.Model):
	plato = models.ForeignKey(Plato, on_delete=models.CASCADE, verbose_name = "Plato Tipico reservado")
	usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name = "Reservado por")
	fecha_inicial = models.DateField('Fecha inicial de reserva', blank = False, null = False)
	fecha_final = models.DateField('Fecha final de reserva', blank = False, null = False)
	cantidad_dias = models.SmallIntegerField('Tiempo de espera (En días)', default = 1)
	costo = models.DecimalField('Costo de la reserva', blank = False, null = False, max_digits=9, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
	cantidad_plato = models.SmallIntegerField('Cantidad (platos típicos)')
	estado = models.BooleanField('Estado (Eliminación lógica)',default = True)
	confirmar = models.BooleanField('Confirmar (Confirmación de reserva)',default = False)
	activado = models.BooleanField('Activado (Cancelado o Aceptado)',default = False)
	visita = models.BooleanField('Visita (Turismo Visitado)',default = True)
	created = models.DateTimeField('Fecha de publicacion', editable=False, null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', editable=False, null=True, blank=True)

	def natural_key(self):
		return f'{self.plato}'

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(ReservaPlato, self).save(*args, **kwargs)

	class Meta:
		verbose_name_plural = 'Platos Tipicos'
		verbose_name = 'la reserva'
	def __str__(self):
		return '{}'.format(self.plato)

# Modelo de reserva para lugares turisticos
class ReservaTurismo(models.Model):
	turismo = models.ForeignKey(Turismo, on_delete=models.CASCADE, verbose_name = "Lugar Turistico reservado")
	usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name = "Reservado por")
	fecha_inicial = models.DateField('Fecha inicial de reserva', blank = False, null = False)
	fecha_final = models.DateField('Fecha final de reserva', blank = False, null = False)
	cantidad_dias = models.SmallIntegerField('Tiempo de espera (En días)', default = 1)
	costo = models.DecimalField('Costo de la reserva', blank = False, null = False, max_digits=9, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
	estado = models.BooleanField('Estado (Eliminación lógica)',default = True)
	confirmar = models.BooleanField('Confirmar (Confirmación de reserva)',default = False)
	activado = models.BooleanField('Activado (Cancelado o Aceptado)',default = False)
	visita = models.BooleanField('Visita (Turismo Visitado)',default = True)
	created = models.DateTimeField('Fecha de publicacion', editable=False, null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', editable=False, null=True, blank=True)

	def natural_key(self):
		return f'{self.turismo}'

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(ReservaTurismo, self).save(*args, **kwargs)

	class Meta:
		verbose_name_plural = 'Lugares Turísticos'
		verbose_name = 'la reserva'
	def __str__(self):
		return '{}'.format(self.turismo)