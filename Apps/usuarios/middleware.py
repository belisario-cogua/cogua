from datetime import timedelta,date, datetime 
from django.utils import timezone
from Apps.reservas.models import *

class PruebaMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		print(request)
		response = self.get_response(request)
		return response

	def process_view(sel, request, view_func, view_args, view_kwargs):
		url = request.META.get('PATH_INFO')
		if request.user.is_authenticated:
			fecha_actual = timezone.localtime()

			reservaDeporte = ReservaDeporte.objects.filter(estado=True, usuario = request.user)
			reservaHotel = ReservaHotel.objects.filter(estado=True, usuario = request.user)
			reservaPlato = ReservaPlato.objects.filter(estado=True, usuario = request.user)
			reservaTurismo = ReservaTurismo.objects.filter(estado=True, usuario = request.user)

			for reserva in reservaDeporte:
				date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
				date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
				#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
				#y la fecha en la que empieza la reserva es decir la fecha_inicial
				dias = date_inicial - date_created
				vencimiento = reserva.created + timedelta(days = dias.days)
				reserva.cantidad_dias = dias.days
				reserva.save()
				if reserva.confirmar == False:
					if fecha_actual > vencimiento:
						reserva.visita = False
						reserva.save()

			for reserva in reservaHotel:
				date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
				date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
				#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
				#y la fecha en la que empieza la reserva es decir la fecha_inicial
				dias = date_inicial - date_created
				vencimiento = reserva.created + timedelta(days = dias.days)
				reserva.cantidad_dias = dias.days
				reserva.save()
				if reserva.confirmar == False:
					if fecha_actual > vencimiento:
						reserva.visita = False
						reserva.save()

			for reserva in reservaPlato:
				date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
				date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
				#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
				#y la fecha en la que empieza la reserva es decir la fecha_inicial
				dias = date_inicial - date_created
				vencimiento = reserva.created + timedelta(days = dias.days)
				reserva.cantidad_dias = dias.days
				reserva.save()
				if reserva.confirmar == False:
					if fecha_actual > vencimiento:
						reserva.visita = False
						reserva.save()

			for reserva in reservaTurismo:
				date_inicial = datetime.strptime(str(reserva.fecha_inicial), '%Y-%m-%d').date()
				date_created = datetime.strptime(str(reserva.created.date()), '%Y-%m-%d').date()
				#en dias obtengo la cantidad de dias que hay entre la fecha que se realizo la reserva es decir la fecha_created
				#y la fecha en la que empieza la reserva es decir la fecha_inicial
				dias = date_inicial - date_created
				vencimiento = reserva.created + timedelta(days = dias.days)
				reserva.cantidad_dias = dias.days
				reserva.save()
				if reserva.confirmar == False:
					if fecha_actual > vencimiento:
						reserva.visita = False
						reserva.save()