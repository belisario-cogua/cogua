from django.db import models
from django.utils import timezone
from Apps.usuarios.models import Usuario
from Apps.publicaciones.models import *
from Apps.deportes.models import Deporte
from Apps.hoteles.models import Hotel
from Apps.platos.models import Plato
from Apps.turismos.models import Turismo
from Apps.reservas.models import ReservaDeporte, ReservaHotel, ReservaPlato, ReservaTurismo
# Create your models here.

class Notificacion(models.Model):
	tipo = models.CharField(max_length = 200, blank = True, null = True, default="notificacion")
	actor = models.ForeignKey(Usuario, on_delete=models.CASCADE,blank = True,null = True,related_name = 'actor')
	destinatario = models.ForeignKey(Usuario, on_delete=models.CASCADE,blank = True,null = True,related_name = 'destinatario')
	comentario = models.ForeignKey(Comentario, on_delete=models.CASCADE,blank = True,null = True)
	publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE,blank = True,null = True)
	solicitud = models.CharField(max_length = 200, blank = True, null = True, default="Sin confirmar")
	notificacion_num = models.SmallIntegerField('Notificacion', default = 0)
	enviado = models.BooleanField('Enviado ',default = False)
	reserva_hotel = models.ForeignKey(ReservaHotel, on_delete=models.CASCADE,blank = True,null = True,verbose_name = "Hotel reservado")
	reserva_deporte = models.ForeignKey(ReservaDeporte, on_delete=models.CASCADE,blank = True,null = True,verbose_name = "Deporte reservado")
	reserva_turismo = models.ForeignKey(ReservaTurismo, on_delete=models.CASCADE,blank = True,null = True,verbose_name = "Lugar Turístico reservado")
	reserva_plato = models.ForeignKey(ReservaPlato, on_delete=models.CASCADE,blank = True,null = True,verbose_name = "Plato Típico reservado")
	created = models.DateTimeField('Fecha de publicacion', null=True,blank=True)
	modified = models.DateTimeField('Fecha de modificacion', null=True, blank=True)

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.now()
		self.modified = timezone.now()
		return super(Notificacion, self).save(*args, **kwargs)

	class Meta:
		verbose_name = 'Notificacion'
		verbose_name_plural = 'Notificaciones'
		ordering = ['-created']

	def __str__(self):
		return '{}'.format(self.tipo)