from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.views.generic import  View, TemplateView, CreateView, ListView, UpdateView, DeleteView, DetailView
from .models import Hotel
from .forms import HotelForm
from Apps.usuarios.mixins import LoginAndSuperStaffMixin
from Apps.usuarios.models import Usuario
from Apps.reservas.models import ReservaHotel, ReservaDeporte, ReservaPlato, ReservaTurismo
from datetime import date, datetime 

# Create your views here.
class AgregarHotel(LoginAndSuperStaffMixin,CreateView):
	model = Hotel
	form_class = HotelForm
	template_name = 'hoteles/perfil_ModalAgregarHotel.html'

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			form = self.form_class(data=request.POST,files=request.FILES)
			usuario = Usuario.objects.filter(id = request.user.id)
			print(usuario)
			if form.is_valid():
				obj = form.save(commit=False)
				obj.user_id = request.user
				obj.save()
				mensaje = f'{self.model.__name__} registrado correctamente!'
				error = 'No hay error!'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 201
				#retorna response para ser interpretado con javascript
				return response

			else:
				mensaje = f'El {self.model.__name__} no se ha podido registrar, porfavor intentelo nuevamente!'
				#guardamos todos los errores mediante form.errors
				error = form.errors
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

		else:
			return redirect('templates_hotel:listar_hoteles')

class PerfilListarHoteles(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'hoteles/perfil_listarHoteles.html'

    def get_context_data(self, **kwargs):
    	context = super(PerfilListarHoteles, self).get_context_data(**kwargs)
    	context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
    	context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
    	context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
    	context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
    	return context

class ListarHoteles(LoginAndSuperStaffMixin,ListView):
	model = Hotel

	def get_queryset(self):
		return self.model.objects.filter(estado=True)

	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			return HttpResponse(serialize('json', self.get_queryset()), 'application/json')

		else:
			return redirect('templates_hotel:inicio_hoteles')

class HotelPerfilDetalles(DetailView):
	model = Hotel
	template_name = 'hoteles/perfil_ModalHotelDetalles.html'

class EditarHotel(LoginAndSuperStaffMixin,UpdateView):
	model = Hotel
	form_class = HotelForm
	template_name = 'hoteles/perfil_ModalEditarHotel.html'

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			form = self.form_class(data=request.POST,files=request.FILES,instance = self.get_object())
			if form.is_valid():
				form.save()
				mensaje = f'{self.model.__name__} actualizado correctamente!'
				error = 'No hay error!'
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 201
				#retorna response para ser interpretado con javascript
				return response

			else:
				mensaje = f'El {self.model.__name__} no se ha podido actualizar, porfavor intentelo nuevamente!'
				#guardamos todos los errores mediante form.errors
				error = form.errors
				response = JsonResponse({'mensaje':mensaje,'error':error})
				response.status_code = 400
				return response

		else:
			return redirect('templates_hotel:listar_hoteles')

class EliminarHotel(LoginAndSuperStaffMixin,DeleteView):
	model = Hotel
	template_name = 'hoteles/perfil_ModalEliminarHotel.html'

	def delete(self, request, *args, **kwargs):
		if request.is_ajax():
			deporte = self.get_object()
			#deporte.delete()
			deporte.estado = False
			deporte.save()
			mensaje = f'{self.model.__name__} eliminado correctamente!'
			error = 'No hay error!'
			response = JsonResponse({'mensaje':mensaje,'error':error})
			response.status_code = 201
			#retorna response para ser interpretado con javascript
			return response

		else:
			return redirect('templates_hotel:listar_hoteles')