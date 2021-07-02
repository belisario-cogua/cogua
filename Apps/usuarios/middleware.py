from datetime import timedelta,date, datetime 
from django.utils import timezone
from Apps.reservas.models import *
from Apps.notificaciones.models import Notificacion
import json
from types import SimpleNamespace
class PruebaMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		print(request)
		response = self.get_response(request)
		return response

	def process_view(sel, request, view_func, view_args, view_kwargs):
		url = request.META.get('PATH_INFO')
		#para enviar las notificaciones de reservas caducados
		notificacion = Notificacion.objects.all()
		ahora = timezone.localtime()

		for noti in notificacion:
			cantidad = noti.notificacion_num
			tipo = noti.tipo
			solicitud = noti.solicitud
			today = date.today()

			if tipo == "caducar":
				if solicitud == "reserva deporte":
					obtener_fecha = noti.reserva_deporte.fecha_inicial
					if today > obtener_fecha:
						if noti.enviado == False and noti.notificacion_num == 1:
							notificar = Usuario.objects.get(id=noti.reserva_deporte.usuario_id)
							notitempo = notificar.notificacion + cantidad
							notificar.notificacion = notitempo
							notificar.save()

							noti.enviado = True
							noti.notificacion_num = 0

							noti.created = ahora
							noti.save()
					else:
						noti.enviado = False
						noti.notificacion_num = 1
						noti.save()

				elif solicitud == "reserva hotel":
					obtener_fecha = noti.reserva_hotel.fecha_inicial
					if today > obtener_fecha:
						if noti.enviado == False and noti.notificacion_num == 1:
							notificar = Usuario.objects.get(id=noti.reserva_hotel.usuario_id)
							notitempo = notificar.notificacion + cantidad
							notificar.notificacion = notitempo
							notificar.save()

							noti.enviado = True
							noti.notificacion_num = 0

							noti.created = ahora
							noti.save()
					else:
						noti.enviado = False
						noti.notificacion_num = 1
						noti.save()

				elif solicitud == "reserva plato":
					obtener_fecha = noti.reserva_plato.fecha_inicial
					if today > obtener_fecha:
						if noti.enviado == False and noti.notificacion_num == 1:
							notificar = Usuario.objects.get(id=noti.reserva_plato.usuario_id)
							notitempo = notificar.notificacion + cantidad
							notificar.notificacion = notitempo
							notificar.save()

							noti.enviado = True
							noti.notificacion_num = 0

							noti.created = ahora
							noti.save()
					else:
						noti.enviado = False
						noti.notificacion_num = 1
						noti.save()

				elif solicitud == "reserva turismo":
					obtener_fecha = noti.reserva_turismo.fecha_inicial
					if today > obtener_fecha:
						if noti.enviado == False and noti.notificacion_num == 1:
							notificar = Usuario.objects.get(id=noti.reserva_turismo.usuario_id)
							notitempo = notificar.notificacion + cantidad
							notificar.notificacion = notitempo
							notificar.save()

							noti.enviado = True
							noti.notificacion_num = 0

							noti.created = ahora
							noti.save()
					else:
						noti.enviado = False
						noti.notificacion_num = 1
						noti.save()

		#para caducar las reservas
		fecha_actual = timezone.localtime()

		reservaDeporte = ReservaDeporte.objects.filter(estado=True)
		reservaHotel = ReservaHotel.objects.filter(estado=True)
		reservaPlato = ReservaPlato.objects.filter(estado=True)
		reservaTurismo = ReservaTurismo.objects.filter(estado=True)

		for reserva in reservaDeporte:
			date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
			date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
			#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
			#y la fecha en la que empieza la reserva es decir la fecha_inicial
			dias = date_inicial - date_created
			vencimiento = reserva.created + timedelta(days = dias.days+1)
			reserva.cantidad_dias = dias.days+1
			reserva.save()
			if reserva.cantidad_dias <= 0:
				reserva.cantidad_dias = 0
				reserva.save()

			if reserva.activado == False:
				if fecha_actual > vencimiento:
					reserva.visita = False
					reserva.save()
				else:
					reserva.visita = True
					reserva.save()
			else:
				reserva.visita = True
				reserva.save()

		for reserva in reservaHotel:
			date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
			date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
			#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
			#y la fecha en la que empieza la reserva es decir la fecha_inicial
			dias = date_inicial - date_created
			vencimiento = reserva.created + timedelta(days = dias.days+1)
			reserva.cantidad_dias = dias.days+1
			reserva.save()
			if reserva.cantidad_dias <= 0:
				reserva.cantidad_dias = 0
				reserva.save()

			if reserva.activado == False:
				if fecha_actual > vencimiento:
					reserva.visita = False
					reserva.save()
				else:
					reserva.visita = True
					reserva.save()
			else:
				reserva.visita = True
				reserva.save()

		for reserva in reservaPlato:
			date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
			date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
			#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
			#y la fecha en la que empieza la reserva es decir la fecha_inicial
			dias = date_inicial - date_created
			vencimiento = reserva.created + timedelta(days = dias.days+1)
			reserva.cantidad_dias = dias.days+1
			reserva.save()
			if reserva.cantidad_dias <= 0:
				reserva.cantidad_dias = 0
				reserva.save()
			if reserva.activado == False:
				if fecha_actual > vencimiento:
					reserva.visita = False
					reserva.save()
				else:
					reserva.visita = True
					reserva.save()
			else:
				reserva.visita = True
				reserva.save()

		for reserva in reservaTurismo:
			date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
			date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
			#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
			#y la fecha en la que empieza la reserva es decir la fecha_inicial
			dias = date_inicial - date_created
			vencimiento = reserva.created + timedelta(days = dias.days+1)
			reserva.cantidad_dias = dias.days+1
			reserva.save()
			if reserva.cantidad_dias <= 0:
				reserva.cantidad_dias = 0
				reserva.save()
			if reserva.activado == False:
				if fecha_actual > vencimiento:
					reserva.visita = False
					reserva.save()
				else:
					reserva.visita = True
					reserva.save()
			else:
				reserva.visita = True
				reserva.save()