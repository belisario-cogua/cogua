from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from .models import Publicacion
from .forms import PublicacionForm
from Apps.usuarios.mixins import LoginAndSuperStaffMixin
from django.views.generic import  View, TemplateView, CreateView, ListView, UpdateView, DeleteView, DetailView
from Apps.reservas.models import ReservaHotel, ReservaDeporte, ReservaPlato, ReservaTurismo
from datetime import date, datetime 

# Create your views here.
class AgregarPublicacion(LoginAndSuperStaffMixin,CreateView):
	model = Publicacion
	form_class = PublicacionForm
	template_name = 'publicaciones/perfil_ModalAgregarPublicacion.html'

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			form = self.form_class(data=request.POST,files=request.FILES)
			if form.is_valid():
				obj = form.save(commit=False)
				obj.usuario = request.user
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
			return redirect('templates_publicaciones:listar_publicaciones')

class PerfilListarPublicaciones(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'publicaciones/perfil_listarPublicaciones.html'

    def get_context_data(self, **kwargs):
    	context = super(PerfilListarPublicaciones, self).get_context_data(**kwargs)
    	context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
    	context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
    	context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
    	context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
    	return context

class ListarPublicaciones(LoginAndSuperStaffMixin,ListView):
	model = Publicacion

	def get_queryset(self):
		return self.model.objects.filter(estado=True)

	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			return HttpResponse(serialize('json', self.get_queryset()), 'application/json')

		else:
			return redirect('templates_publicaciones:inicio_publicaciones')

class PublicacionPerfilDetalles(DetailView):
	model = Publicacion
	template_name = 'publicaciones/perfil_ModalPublicacionDetalles.html'

class EditarPublicacion(LoginAndSuperStaffMixin,UpdateView):
	model = Publicacion
	form_class = PublicacionForm
	template_name = 'publicaciones/perfil_ModalEditarPublicacion.html'

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
			return redirect('templates_publicaciones:listar_publicaciones')

class EliminarPublicacion(LoginAndSuperStaffMixin,DeleteView):
	model = Publicacion
	template_name = 'publicaciones/perfil_ModalEliminarPublicacion.html'

	def delete(self, request, *args, **kwargs):
		if request.is_ajax():
			publicacion = self.get_object()
			#publicacion.delete()
			publicacion.estado = False
			publicacion.save()
			mensaje = f'{self.model.__name__} eliminado correctamente!'
			error = 'No hay error!'
			response = JsonResponse({'mensaje':mensaje,'error':error})
			response.status_code = 201
			#retorna response para ser interpretado con javascript
			return response

		else:
			return redirect('templates_publicaciones:listar_publicaciones')