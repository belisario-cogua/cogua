from django.shortcuts import render, redirect
from django.views.generic import CreateView, TemplateView, DetailView, DeleteView
from django.urls import reverse_lazy
from django.http import HttpResponse, JsonResponse
from datetime import date, datetime 
from Apps.reservas.models import ReservaDeporte, ReservaHotel, ReservaPlato, ReservaTurismo
from Apps.usuarios.models import Usuario
from Apps.deportes.models import Deporte
from Apps.hoteles.models import Hotel
from Apps.platos.models import Plato
from Apps.turismos.models import Turismo
from .forms import ReservaDeporteForm, ReservaHotelForm
from notifications.signals import notify

# Create your views here.
primer_error_else = f'La reserva no se ha podido realizar, los campos de fechas aún están vacíos !'
segundo_error_else = f'La reserva no se ha podido realizar. El campo de fecha de inicio aun esta vacio !'
tercer_error_else = f'La reserva no se ha podido realizar. el campo de fecha de fin aun esta vacio !'
cuarto_error_else = f'La reserva no se ha podido realizar. La fecha de inicio no puede ser el mismo dia o los dias anteriores que la fecha de hoy !!'
quinto_error_else = f'La reserva no se ha podido realizar. La fecha de fin no puede ser el mismo dia o los dias anteriores que la fecha de hoy !!'
sexto_error_else = f'La reserva no se ha podido realizar. La fecha de fin es menor que la fecha de inicio !'
septimo_error_else = f'La reserva no se ha podido realizar. La fecha de inicio no puede ser el mismo dia o los dias anteriores que la fecha de hoy !!'
octavo_error_else = f'La reserva no se ha podido realizar. La fecha de fin no puede ser el mismo dia o los dias anteriores que la fecha de hoy !!'
noveno_error_else = f'Su reserva es invalida. Su rango de fechas no puede estar en el rango de fechas ya reservados por otros clientes. !!'

class ReservaDeporteDetalles(DetailView):
	model = Deporte
	template_name = 'home/deportes/index_ModalReservarDeporte.html'

	def get_context_data(self, **kwargs):
		context = super(ReservaDeporteDetalles, self).get_context_data(**kwargs)
		context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
		return context

class RegistrarReservaDeporte(CreateView):
	model = ReservaDeporte
	success_url = reverse_lazy('templates_home:listado_deportes_disponibles')

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			usuario = Usuario.objects.filter(id = request.POST.get('usuario')).first()
			deporte = Deporte.objects.filter(id = request.POST.get('deporte')).first()
			fecha_inicial = request.POST.get('fecha1')
			fecha_final = request.POST.get('fecha2')
			costo = request.POST.get('costo')

			fecha_actual = datetime.today()
			user = Usuario.objects.get(id=request.user.id)
			solicitud = Usuario.objects.filter(is_superuser = True)

			if fecha_inicial and fecha_final:
				#datetime.strptime(fecha_inicial, '%Y-%m-%d') -> permite transformar un string a date
				fecha_inicial_a_date = datetime.strptime(fecha_inicial, '%Y-%m-%d')
				fecha_final_a_date = datetime.strptime(fecha_final, '%Y-%m-%d')

				if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual and fecha_final_a_date > fecha_inicial_a_date or fecha_final_a_date == fecha_inicial_a_date:
					if fecha_final_a_date == fecha_inicial_a_date:
						if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual:
							nueva_reserva = self.model(
								usuario = usuario,
								deporte = deporte,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaDeporte.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='deporte',
								deporte_id=reserva_actual.id,
								deporte=reserva_actual.deporte.nombre,
								tipo="caducar"
								)
							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

						# septimo error else
						elif fecha_inicial_a_date < fecha_actual:
							mensaje = septimo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

						# octavo error else
						elif fecha_final_a_date < fecha_actual:
							mensaje = octavo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

					else:
						validar = ReservaDeporte.objects.filter(fecha_inicial__gte=datetime.strptime(fecha_inicial, '%Y-%m-%d'),fecha_final__lte=datetime.strptime(fecha_final, '%Y-%m-%d'),deporte_id=deporte, estado = True)
						if validar:
							mensaje = noveno_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response
						else:
							nueva_reserva = self.model(
								usuario = usuario,
								deporte = deporte,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaDeporte.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='deporte',
								deporte_id=reserva_actual.id,
								deporte=reserva_actual.deporte.nombre,
								tipo="caducar"
								)

							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response
						

				# cuarto error else
				elif fecha_inicial_a_date < fecha_actual:
					mensaje = cuarto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# quinto error else
				elif fecha_final_a_date < fecha_actual:
					mensaje = quinto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# sexto error else
				elif fecha_final_a_date < fecha_inicial_a_date:
					mensaje = sexto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

			# primer error else
			elif not fecha_inicial and not fecha_final:
				mensaje = primer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# segundo error else
			elif not fecha_inicial:
				mensaje = segundo_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# tercer error else
			elif not fecha_final:
				mensaje = tercer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response
		return redirect('templates_home:listado_deportes_disponibles')

class EliminarReservaDeporte(DeleteView):
	model = ReservaDeporte

	def delete(self, request, *args, **kwargs):
		if request.is_ajax():
			reservadeporte = self.get_object()
			#reservadeporte.delete()
			reservadeporte.estado = False
			reservadeporte.save()
			mensaje = f'{self.model.__name__} eliminado correctamente!'
			error = 'No hay error!'
			response = JsonResponse({'mensaje':mensaje,'error':error})
			response.status_code = 201
			#retorna response para ser interpretado con javascript
			return response

		else:
			return redirect('templates_perfil:listar_reservas_deportes')

class ConfirmarReserva(CreateView):

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			reserva_id = request.POST.get('reserva')
			nombre = request.POST.get('modelo')
			opcion = request.POST.get('opcion')
			user = Usuario.objects.get(id=request.user.id)
			if nombre == "deporte":
				editar = ReservaDeporte.objects.get(id=reserva_id)
				notificacion = Usuario.objects.get(id=editar.usuario.id)
				if opcion == "confirmar":
					editar.confirmar = True
					editar.save()

					notitempo = notificacion.notificacion + 1
					notificacion.notificacion = notitempo
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de deporte aceptado",target=editar,level='success',tipo="solicitud")

					mensaje = "reserva del deporte aceptado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response
				elif opcion == "cancelar":
					editar.confirmar = False
					editar.save()

					notitempo1 = notificacion.notificacion + 1
					notificacion.notificacion = notitempo1
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de deporte cancelado",target=editar, level='warning',tipo="solicitud")

					mensaje = "reserva del deporte cancelado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response

			elif nombre == "turismo":
				editar = ReservaTurismo.objects.get(id=reserva_id)
				notificacion = Usuario.objects.get(id=editar.usuario.id)
				if opcion == "confirmar":
					editar.confirmar = True
					editar.save()

					notitempo = notificacion.notificacion + 1
					notificacion.notificacion = notitempo
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de lugar turístico aceptado",target=editar,level='success',tipo="solicitud")

					mensaje = "reserva del lugar turistico aceptado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response
				elif opcion == "cancelar":
					editar.confirmar = False
					editar.save()

					notitempo1 = notificacion.notificacion + 1
					notificacion.notificacion = notitempo1
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de lugar turístico cancelado",target=editar, level='warning',tipo="solicitud")

					mensaje = "reserva del lugar turistico cancelado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response

			elif nombre == "plato":
				editar = ReservaPlato.objects.get(id=reserva_id)
				notificacion = Usuario.objects.get(id=editar.usuario.id)
				if opcion == "confirmar":
					editar.confirmar = True
					editar.save()

					notitempo = notificacion.notificacion + 1
					notificacion.notificacion = notitempo
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de plato típico aceptado",target=editar,level='success',tipo="solicitud")

					mensaje = "reserva del plato tipico aceptado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response
				elif opcion == "cancelar":
					editar.confirmar = False
					editar.save()

					notitempo1 = notificacion.notificacion + 1
					notificacion.notificacion = notitempo1
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de plato típico cancelado",target=editar, level='warning',tipo="solicitud")

					mensaje = "reserva del plato tipico cancelado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response

			elif nombre == "hotel":
				editar = ReservaHotel.objects.get(id=reserva_id)
				notificacion = Usuario.objects.get(id=editar.usuario.id)
				if opcion == "confirmar":
					editar.confirmar = True
					editar.save()

					notitempo = notificacion.notificacion + 1
					notificacion.notificacion = notitempo
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de la cabaña aceptado",target=editar,level='success',tipo="solicitud")

					mensaje = "reserva de la cabaña aceptado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response
				elif opcion == "cancelar":
					editar.confirmar = False
					editar.save()

					notitempo1 = notificacion.notificacion + 1
					notificacion.notificacion = notitempo1
					notificacion.save()
					notify.send(request.user, recipient=notificacion, verb="solicitud",description="Reserva de la cabaña cancelado",target=editar, level='warning',tipo="solicitud")

					mensaje = "reserva de la cabaña cancelado"
					response = JsonResponse({'mensaje':mensaje})
					response.status_code = 201
					#retorna response para ser interpretado con javascript
					return response
		return redirect('templates_perfil:listar_reservas_deportes')

class ReservaHotelDetalles(DetailView):
	model = Hotel
	template_name = 'home/hoteles/index_ModalReservarHotel.html'

	def get_context_data(self, **kwargs):
		context = super(ReservaHotelDetalles, self).get_context_data(**kwargs)
		context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
		return context

class RegistrarReservaHotel(CreateView):
	model = ReservaHotel
	success_url = reverse_lazy('templates_home:listado_hoteles_disponibles')

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			usuario = Usuario.objects.filter(id = request.POST.get('usuario')).first()
			hotel = Hotel.objects.filter(id = request.POST.get('hotel')).first()
			fecha_inicial = request.POST.get('fecha1')
			fecha_final = request.POST.get('fecha2')
			costo = request.POST.get('costo')

			fecha_actual = datetime.today();
			user = Usuario.objects.get(id=request.user.id)
			solicitud = Usuario.objects.filter(is_superuser = True)

			if fecha_inicial and fecha_final:
				#datetime.strptime(fecha_inicial, '%Y-%m-%d') -> permite transformar un string a date
				fecha_inicial_a_date = datetime.strptime(fecha_inicial, '%Y-%m-%d')
				fecha_final_a_date = datetime.strptime(fecha_final, '%Y-%m-%d')

				if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual and fecha_final_a_date > fecha_inicial_a_date or fecha_final_a_date == fecha_inicial_a_date:
					if fecha_final_a_date == fecha_inicial_a_date:
						if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual:
							nueva_reserva = self.model(
								usuario = usuario,
								hotel = hotel,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaHotel.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='cabaña',
								cabaña_id=reserva_actual.id,
								cabaña=reserva_actual.hotel.nombre,
								tipo="caducar"
								)
							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

						# septimo error else
						elif fecha_inicial_a_date < fecha_actual:
							mensaje = septimo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

						# octavo error else
						elif fecha_final_a_date < fecha_actual:
							mensaje = octavo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

					else:
						validar = ReservaHotel.objects.filter(fecha_inicial__gte=datetime.strptime(fecha_inicial, '%Y-%m-%d'),fecha_final__lte=datetime.strptime(fecha_final, '%Y-%m-%d'),hotel_id=hotel, estado = True)
						if validar:
							mensaje = noveno_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response
						else:
							nueva_reserva = self.model(
								usuario = usuario,
								hotel = hotel,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaHotel.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='cabaña',
								cabaña_id=reserva_actual.id,
								cabaña=reserva_actual.hotel.nombre,
								tipo="caducar"
								)
							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

				# cuarto error else
				elif fecha_inicial_a_date < fecha_actual:
					mensaje = cuarto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# quinto error else
				elif fecha_final_a_date < fecha_actual:
					mensaje = quinto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# sexto error else
				elif fecha_final_a_date < fecha_inicial_a_date:
					mensaje = sexto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

			# primer error else
			elif not fecha_inicial and not fecha_final:
				mensaje = primer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# segundo error else
			elif not fecha_inicial:
				mensaje = segundo_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# tercer error else
			elif not fecha_final:
				mensaje = tercer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

		return redirect('templates_home:listado_hoteles_disponibles')

class EliminarReservaHotel(DeleteView):
	model = ReservaHotel

	def delete(self, request, *args, **kwargs):
		if request.is_ajax():
			reservahotel = self.get_object()
			#reservahotel.delete()
			reservahotel.estado = False
			reservahotel.save()
			mensaje = f'{self.model.__name__} eliminado correctamente!'
			error = 'No hay error!'
			response = JsonResponse({'mensaje':mensaje,'error':error})
			response.status_code = 201
			#retorna response para ser interpretado con javascript
			return response

		else:
			return redirect('templates_perfil:listar_reservas_hoteles')

class ReservaPlatoDetalles(DetailView):
	model = Plato
	template_name = 'home/platos/index_ModalReservarPlato.html'

	def get_context_data(self, **kwargs):
		context = super(ReservaPlatoDetalles, self).get_context_data(**kwargs)
		context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
		return context

class RegistrarReservaPlato(CreateView):
	model = ReservaPlato
	success_url = reverse_lazy('templates_home:listado_platos_disponibles')

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			usuario = Usuario.objects.filter(id = request.POST.get('usuario')).first()
			plato = Plato.objects.filter(id = request.POST.get('plato')).first()
			fecha_inicial = request.POST.get('fecha1')
			fecha_final = request.POST.get('fecha2')
			costo = request.POST.get('costo')

			fecha_actual = datetime.today();
			user = Usuario.objects.get(id=request.user.id)
			solicitud = Usuario.objects.filter(is_superuser = True)

			if fecha_inicial and fecha_final:
				#datetime.strptime(fecha_inicial, '%Y-%m-%d') -> permite transformar un string a date
				fecha_inicial_a_date = datetime.strptime(fecha_inicial, '%Y-%m-%d')
				fecha_final_a_date = datetime.strptime(fecha_final, '%Y-%m-%d')

				if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual and fecha_final_a_date > fecha_inicial_a_date or fecha_final_a_date == fecha_inicial_a_date:
					if fecha_final_a_date == fecha_inicial_a_date:
						if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual:
							nueva_reserva = self.model(
								usuario = usuario,
								plato = plato,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaPlato.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='platostipico',
								plato_id=reserva_actual.id,
								plato=reserva_actual.plato.nombre,
								tipo="caducar"
								)
							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

						# septimo error else
						elif fecha_inicial_a_date < fecha_actual:
							mensaje = septimo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

						# octavo error else
						elif fecha_final_a_date < fecha_actual:
							mensaje = octavo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

					else:
						validar = ReservaPlato.objects.filter(fecha_inicial__gte=datetime.strptime(fecha_inicial, '%Y-%m-%d'),fecha_final__lte=datetime.strptime(fecha_final, '%Y-%m-%d'),plato_id=plato, estado = True)
						if validar:
							mensaje = noveno_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response
						else:
							nueva_reserva = self.model(
								usuario = usuario,
								plato = plato,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaPlato.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='platostipico',
								plato_id=reserva_actual.id,
								plato=reserva_actual.plato.nombre,
								tipo="caducar"
								)
							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

				# cuarto error else
				elif fecha_inicial_a_date < fecha_actual:
					mensaje = cuarto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# quinto error else
				elif fecha_final_a_date < fecha_actual:
					mensaje = quinto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# sexto error else
				elif fecha_final_a_date < fecha_inicial_a_date:
					mensaje = sexto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

			# primer error else
			elif not fecha_inicial and not fecha_final:
				mensaje = primer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# segundo error else
			elif not fecha_inicial:
				mensaje = segundo_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# tercer error else
			elif not fecha_final:
				mensaje = tercer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

		return redirect('templates_home:listado_platos_disponibles')

class EliminarReservaPlato(DeleteView):
	model = ReservaPlato

	def delete(self, request, *args, **kwargs):
		if request.is_ajax():
			reservaplato = self.get_object()
			#reservaplato.delete()
			reservaplato.estado = False
			reservaplato.save()
			mensaje = f'{self.model.__name__} eliminado correctamente!'
			error = 'No hay error!'
			response = JsonResponse({'mensaje':mensaje,'error':error})
			response.status_code = 201
			#retorna response para ser interpretado con javascript
			return response

		else:
			return redirect('templates_perfil:listar_reservas_platos')

class ReservaTurismoDetalles(DetailView):
	model = Turismo
	template_name = 'home/turismos/index_ModalReservarTurismo.html'

	def get_context_data(self, **kwargs):
		context = super(ReservaTurismoDetalles, self).get_context_data(**kwargs)
		context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
		return context

class RegistrarReservaTurismo(CreateView):
	model = ReservaTurismo
	success_url = reverse_lazy('templates_home:listado_turismos_disponibles')

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			usuario = Usuario.objects.filter(id = request.POST.get('usuario')).first()
			turismo = Turismo.objects.filter(id = request.POST.get('turismo')).first()
			fecha_inicial = request.POST.get('fecha1')
			fecha_final = request.POST.get('fecha2')
			costo = request.POST.get('costo')
			
			fecha_actual = datetime.today();
			user = Usuario.objects.get(id=request.user.id)
			solicitud = Usuario.objects.filter(is_superuser = True)

			if fecha_inicial and fecha_final:
				#datetime.strptime(fecha_inicial, '%Y-%m-%d') -> permite transformar un string a date
				fecha_inicial_a_date = datetime.strptime(fecha_inicial, '%Y-%m-%d')
				fecha_final_a_date = datetime.strptime(fecha_final, '%Y-%m-%d')

				if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual and fecha_final_a_date > fecha_inicial_a_date or fecha_final_a_date == fecha_inicial_a_date:
					if fecha_final_a_date == fecha_inicial_a_date:
						if fecha_inicial_a_date > fecha_actual and fecha_final_a_date > fecha_actual:
							nueva_reserva = self.model(
								usuario = usuario,
								turismo = turismo,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaTurismo.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='lugarturistico',
								turismo_id=reserva_actual.id,
								lugar=reserva_actual.turismo.nombre,
								tipo="caducar"
								)

							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

						# septimo error else
						elif fecha_inicial_a_date < fecha_actual:
							mensaje = septimo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

						# octavo error else
						elif fecha_final_a_date < fecha_actual:
							mensaje = octavo_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response

					else:
						validar = ReservaTurismo.objects.filter(fecha_inicial__gte=datetime.strptime(fecha_inicial, '%Y-%m-%d'),fecha_final__lte=datetime.strptime(fecha_final, '%Y-%m-%d'),turismo_id=turismo, estado = True)
						if validar:
							mensaje = noveno_error_else
							error = 'necesita rellenar el campo'
							response = JsonResponse({'mensaje':mensaje,'error':error})
							response.status_code = 400
							return response
						else:
							nueva_reserva = self.model(
								usuario = usuario,
								turismo = turismo,
								fecha_inicial = fecha_inicial,
								fecha_final = fecha_final,
								costo = costo
							)
							nueva_reserva.save()
							for soli in solicitud:
								solitempo = soli.solicitud + 1
								soli.solicitud = solitempo
								soli.save()

							reserva_actual = ReservaTurismo.objects.get(id=nueva_reserva.id)
							notify.send(
								request.user, 
								recipient=request.user, 
								verb=fecha_inicial,
								target=reserva_actual,
								description="1",
								level='info',
								turismo='lugarturistico',
								turismo_id=reserva_actual.id,
								lugar=reserva_actual.turismo.nombre,
								tipo="caducar"
								)

							mensaje = f'{self.model.__name__} registrado correctamente!'
							error = 'No hay error!'
							response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
							response.status_code = 201
							return response

				# cuarto error else
				elif fecha_inicial_a_date < fecha_actual:
					mensaje = cuarto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# quinto error else
				elif fecha_final_a_date < fecha_actual:
					mensaje = quinto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

				# sexto error else
				elif fecha_final_a_date < fecha_inicial_a_date:
					mensaje = sexto_error_else
					error = 'necesita rellenar el campo'
					response = JsonResponse({'mensaje':mensaje,'error':error})
					response.status_code = 400
					return response

			# primer error else
			elif not fecha_inicial and not fecha_final:
				mensaje = primer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# segundo error else
			elif not fecha_inicial:
				mensaje = segundo_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

			# tercer error else
			elif not fecha_final:
				mensaje = tercer_error_else
				error = 'necesita rellenar el campo'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

		return redirect('templates_home:listado_turismos_disponibles')

class EliminarReservaTurismo(DeleteView):
	model = ReservaTurismo

	def delete(self, request, *args, **kwargs):
		if request.is_ajax():
			reservaturismo = self.get_object()
			#reservaturismo.delete()
			reservaturismo.estado = False
			reservaturismo.save()
			mensaje = f'{self.model.__name__} eliminado correctamente!'
			error = 'No hay error!'
			response = JsonResponse({'mensaje':mensaje,'error':error})
			response.status_code = 201
			#retorna response para ser interpretado con javascript
			return response

		else:
			return redirect('templates_perfil:listar_reservas_turismos')