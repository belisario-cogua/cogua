from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.views.generic import TemplateView, ListView, DetailView, CreateView
from Apps.deportes.models import Deporte
from Apps.hoteles.models import Hotel
from Apps.platos.models import Plato
from Apps.turismos.models import Turismo
from Apps.publicaciones.models import Publicacion, Comentario
from Apps.usuarios.models import Usuario
from Apps.usuarios.mixins import LoginAndSuperStaffMixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from Apps.notificaciones.models import Notificacion as send
import itertools 
from .models import Imagehome
# Create your views here.

class Home(TemplateView):
	template_name = 'home/index.html'

	def get_context_data(self, **kwargs):
		context = super(Home, self).get_context_data(**kwargs)
		context['n_deportes'] = Deporte.objects.filter(estado=True).count()
		context['n_hoteles'] = Hotel.objects.filter(estado=True).count()
		context['n_platos'] = Plato.objects.filter(estado=True).count()
		context['n_turismos'] = Turismo.objects.filter(estado=True).count()
		context['publicaciones'] = Publicacion.objects.all()
		context['imagehome'] = Imagehome.objects.filter(nombre="home")
		context['logo'] = Imagehome.objects.filter(nombre="logo")
		return context

class ListarPublicaciones(ListView):
	model = Publicacion

	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			mensaje = "true"
			publicacion = Publicacion.objects.filter(estado=True).values()
			publicacion1 = Publicacion.objects.filter(estado=True)
			data = []
			temp = []
			for query in publicacion1:
				comentarios = Comentario.objects.filter(publicacion=query.id).values("comentario")
				temp.append(comentarios)
				data.append({
	                    'id': query.id,
	                    'created': query.created,
	                    'titulo':query.nombre,
	                    'imagen':str(query.imagen),
	                    'descripcion': query.descripcion,
	                    'contador': list(comentarios),
	                })
			return JsonResponse({'data':data})

		else:
			return redirect('templates_home:index')

class ListarPublicacionesRecientes(ListView):
	model = Publicacion

	def get_queryset(self):
		queryset = Publicacion.objects.filter(estado=True).order_by('-created')[:3]
		return queryset

	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			return HttpResponse(serialize('json', self.get_queryset()), 'application/json')

		else:
			return redirect('templates_home:index')
class PublicacionDetalles(DetailView):
	model = Publicacion
	template_name = 'home/publicaciones/index_detalles_publicacion.html'

class ListarComentarios(CreateView):
	model = Usuario
	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			id_publicacion = request.POST.get('id')
			comentario = Comentario.objects.filter(publicacion = id_publicacion).values()
			comentario1 = Comentario.objects.filter(publicacion = id_publicacion)
			data = []
			for c in comentario1:
				usuario = Usuario.objects.filter(id = c.usuario.id).values('nombres','apellidos','imagen')
				data.append({
                    'comentario': c.comentario,
                    'creado': c.created,
                    'usuario': list(usuario)
                })
			response = JsonResponse({'comentario':data})
			response.status_code = 201
			return response

class AgregarComentario(CreateView):
	model = Comentario
	success_url = reverse_lazy('templates_home:index')

	def post(self, request, *args, **kwargs):
		if request.is_ajax():
			if request.user.is_authenticated:
				id_publicacion = request.POST.get('id')
				publicacion = Publicacion.objects.filter(id = id_publicacion).first()
				comentario = request.POST.get('comentario')

				usuario = Usuario.objects.filter(id = request.user.id).first()

				nuevo_comentario = self.model(
					publicacion = publicacion,
					usuario = usuario,
					comentario = comentario
				)
				nuevo_comentario.save()

				superusuario = Usuario.objects.filter(is_superuser = True)
				for superuser in superusuario:
					solitempo = superuser.notificacion + 1
					superuser.notificacion = solitempo
					superuser.save()

					user = Usuario.objects.get(id=superuser.id)
					comentario = Comentario.objects.get(id=nuevo_comentario.id)

					enviar = send(
									tipo = "comentario",
									actor = request.user,
									destinatario = user,
									comentario = comentario,
									publicacion = publicacion,
								)
					enviar.save()

				mensaje = "True"
				response = JsonResponse({'mensaje':mensaje,'url':self.success_url})
				response.status_code = 201
				#retorna response para ser interpretado con javascript
				return response
			else:
				sesion = "sesion"
				response = JsonResponse({'error':sesion})
				response.status_code = 400
				#retorna response para ser interpretado con javascript
				return response
			

		else:
			return redirect('templates_home:index')

class DeporteDetalles(DetailView):
	model = Deporte
	template_name = 'home/index_DetallesDeportes.html'

class ListarDeportesDisponibles(ListView):
	model = Deporte
	paginate_by = 6
	template_name = 'home/deportes/index_ListarDeportesDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(publico = True, estado=True)
		return queryset

	def get_context_data(self, **kwargs):
		context = super(ListarDeportesDisponibles, self).get_context_data(**kwargs)
		context['imagedeporte'] = Imagehome.objects.filter(nombre="deporte")
		context['logo'] = Imagehome.objects.filter(nombre="logo")
		return context

class ListarHotelesDisponibles(ListView):
	model = Hotel
	paginate_by = 6
	template_name = 'home/hoteles/index_ListarHotelesDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(publico=True, estado=True)
		return queryset

	def get_context_data(self, **kwargs):
		context = super(ListarHotelesDisponibles, self).get_context_data(**kwargs)
		context['imagehotel'] = Imagehome.objects.filter(nombre="cabaña")
		context['logo'] = Imagehome.objects.filter(nombre="logo")
		return context

class ListarPlatosDisponibles(ListView):
	model = Plato
	paginate_by = 6
	template_name = 'home/platos/index_ListarPlatosDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(cantidad__gte = 0, estado=True)
		return queryset

	def get_context_data(self, **kwargs):
		context = super(ListarPlatosDisponibles, self).get_context_data(**kwargs)
		context['imageplato'] = Imagehome.objects.filter(nombre="plato")
		context['logo'] = Imagehome.objects.filter(nombre="logo")
		return context

class ListarTurismosDisponibles(ListView):
	model = Turismo
	paginate_by = 6
	template_name = 'home/turismos/index_ListarTurismosDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(publico = True, estado=True)
		return queryset

	def get_context_data(self, **kwargs):
		context = super(ListarTurismosDisponibles, self).get_context_data(**kwargs)
		context['imagelugar'] = Imagehome.objects.filter(nombre="lugar")
		context['logo'] = Imagehome.objects.filter(nombre="logo")
		return context

"""from json import loads
from logging import getLogger

from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from dialogflow_fulfillment import QuickReplies,WebhookClient

logger = getLogger('django.server.webhook')


def handler(agent: WebhookClient) -> None:
	deporte = Deporte.objects.get(nombre='assd')
	print(deporte)
	if(agent.intent == "test-intent"):
		agent.add(str(deporte))
		agent.add(QuickReplies(quick_replies=['Happy :)', 'Sad :(']))


@csrf_exempt
def webhook(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        # Get WebhookRequest object
        request_ = loads(request.body)

        # Log request headers and body
        logger.info(f'Request headers: {dict(request.headers)}')
        logger.info(f'Request body: {request_}')

        # Handle request
        agent = WebhookClient(request_)
        agent.handle_request(handler)

        # Log WebhookResponse object
        logger.info(f'Response body: {agent.response}')

        return JsonResponse(agent.response)

    return HttpResponse()"""