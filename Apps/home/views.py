from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.views.generic import TemplateView, ListView, DetailView
from Apps.deportes.models import Deporte
from Apps.hoteles.models import Hotel
from Apps.platos.models import Plato
from Apps.turismos.models import Turismo
from Apps.publicaciones.models import Publicacion
from Apps.usuarios.models import Usuario
# Create your views here.

class Home(TemplateView):
	template_name = 'home/index.html'

	def get_context_data(self, **kwargs):
		context = super(Home, self).get_context_data(**kwargs)
		context['n_deportes'] = Deporte.objects.count()
		context['n_hoteles'] = Hotel.objects.count()
		context['n_platos'] = Plato.objects.count()
		context['n_turismos'] = Turismo.objects.count()
		context['publicaciones'] = Publicacion.objects.all()
		return context

class ListarPublicaciones(ListView):
	model = Publicacion

	def get_queryset(self):
		return self.model.objects.filter(estado=True)

	def get(self,request,*args,**kwargs):
		if request.is_ajax():
			return HttpResponse(serialize('json', self.get_queryset()), 'application/json')

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
		queryset = self.model.objects.filter(cantidad__gte = 0, estado=True)
		return queryset

class ListarHotelesDisponibles(ListView):
	model = Hotel
	paginate_by = 6
	template_name = 'home/hoteles/index_ListarHotelesDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(cantidad__gte = 0, estado=True)
		return queryset

class ListarPlatosDisponibles(ListView):
	model = Plato
	paginate_by = 6
	template_name = 'home/platos/index_ListarPlatosDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(cantidad__gte = 0, estado=True)
		return queryset

class ListarTurismosDisponibles(ListView):
	model = Turismo
	paginate_by = 6
	template_name = 'home/turismos/index_ListarTurismosDisponibles.html'

	def get_queryset(self):
		queryset = self.model.objects.filter(cantidad__gte = 0, estado=True)
		return queryset


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