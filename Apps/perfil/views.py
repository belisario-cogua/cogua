from django.shortcuts import render, redirect
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate,login, logout, get_user_model
from django.contrib import admin
from django.views.generic.edit import FormView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.cache import never_cache
from django.http import HttpResponseRedirect
from itertools import chain
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import  View, TemplateView, CreateView, ListView, UpdateView, DeleteView, DetailView
from Apps.usuarios.forms import LoginForm
from django.contrib.auth.forms import PasswordChangeForm

#import para envio de correos d confirmacion
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from Apps.usuarios.tokens import account_activation_token
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
#fin de import para envio de correos d confirmacion

from Apps.usuarios.models import Usuario
from Apps.usuarios.forms import LoginForm, RegistrarUsuarioForm, EditarUsuarioForm
from Apps.home.forms import ImagehomeForm

from Apps.reservas.models import ReservaHotel, ReservaDeporte, ReservaPlato, ReservaTurismo
from Apps.deportes.models import Deporte
from Apps.turismos.models import Turismo
from Apps.hoteles.models import Hotel
from Apps.platos.models import Plato
from Apps.home.models import Imagehome
from Apps.usuarios.mixins import LoginAndSuperStaffMixin
from datetime import date, datetime 
import copy
from Apps.notificaciones.models import Notificacion
from django.db.models.functions import Coalesce
from django.db.models import Sum
from Apps.publicaciones.models import Publicacion, Comentario
from django.db.models import F
from django.db.models import Count, Max
# Create your views here.
#LoginRequiredMixin es otra manera de de proteger nuestra vista
#es decir necesita iniciar sesion para dirgirise al perfil de ussuario
#de esta manera se hace desde las clases y no desde la url como lo hace login_required
class RegistrarUser(CreateView):
    model = Usuario
    form_class = RegistrarUsuarioForm
    template_name = 'perfil/registrar_user.html'
    success_url = reverse_lazy('templates_home:index')

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            form = self.form_class(data=request.POST,files=request.FILES)
            print("formulario.........")
            print(form)
            if form.is_valid():
                #form.save()
                # Create an inactive user with no password:
                print("dentro del formulario valido...............")
                user = form.save(commit=False)
                user.is_active = False
                user.save()
                current_site = get_current_site(request)
                mail_subject = 'Activa tu cuenta de COGUA'
                print(f'form 1: {user}')
                print(f'form 2: {current_site}')
                print(f'form 3: {current_site.domain}')
                message = render_to_string('perfil/acc_active_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                    'token':account_activation_token.make_token(user),
                })
                print("formulario message...........")
                to_email = form.cleaned_data.get('email')
                print(f"formulario to_email.............{to_email}")
                email = EmailMessage(
                            mail_subject, message, to=[to_email]
                )
                print(f"formulario email...........{email}")
                email.send()
                print("formulario email send.........")
                mensaje = f'{self.model.__name__} registrado correctamente!'
                error = 'No hay error!'
                response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
                response.status_code = 201
                return response
                
            else:
                mensaje = f'El registro no se ha podido realizar, porfavor intentelo nuevamente!'
                #guardamos todos los errores mediante form.errors
                error = form.errors
                response = JsonResponse({'mensaje':mensaje,'error':error})
                response.status_code = 400
                return response

        else:
            return redirect('registrar_user')

User = get_user_model()
def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        # return redirect('home')
        return HttpResponseRedirect('/accounts-confirmed/login/')
    else:
        return HttpResponse('El enlace de activación no es válido.')


class EditarUserActual(UpdateView):
    model = Usuario
    form_class = EditarUsuarioForm
    template_name = 'perfil/perfil_user_actual/editar.html'
    success_url = reverse_lazy('templates_perfil:perfil')

    def dispatch(self, request, *args, **kwargs):
        self.objects = self.get_object()
        return super().dispatch(request, *args, **kwargs)

    def get_object(self, queryset=None):
        return self.request.user

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            form = self.form_class(data=request.POST,files=request.FILES,instance = self.get_object())
            if form.is_valid():
                form.save()
                mensaje = f'{self.model.__name__} actualizado correctamente!'
                error = 'No hay error!'
                response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
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
            return redirect('templates_perfil:perfil')

class EditarPasswordUserActual(FormView):
    model = Usuario
    form_class = PasswordChangeForm
    template_name = 'perfil/perfil_user_actual/editar_password.html'
    success_url = reverse_lazy('login')

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_form(self, form_class=None):
        form = PasswordChangeForm(user = self.request.user)
        return form

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            form = PasswordChangeForm(user= request.user, data=request.POST)
            if form.is_valid():
                form.save()
                mensaje = f'{self.model.__name__} actualizado correctamente!'
                error = 'No hay error!'
                response = JsonResponse({'mensaje':mensaje,'error':error,'url':self.success_url})
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
            return redirect('templates_perfil:perfil')

class Login(FormView):
    template_name = 'perfil/login.html'
    form_class = LoginForm
    success_url = reverse_lazy('templates_perfil:perfil')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self,request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login,self).dispatch(request, *args, **kwargs)

    def form_valid(self,form):
        login(self.request,form.get_user())
        return super(Login,self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(Login, self).get_context_data(**kwargs)
        context['logo'] = Imagehome.objects.filter(nombre="logo")
        return context

#clase para mostrar interfaz de login con mensaje de succeseful de confirmacion de email
class LoginConfirmed(FormView):
    template_name = 'perfil/login_email_confirmed.html'
    form_class = LoginForm
    success_url = reverse_lazy('templates_perfil:perfil')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self,request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(LoginConfirmed,self).dispatch(request, *args, **kwargs)

    def form_valid(self,form):
        login(self.request,form.get_user())
        return super(LoginConfirmed,self).form_valid(form)

def logoutUsuario(request):
    logout(request)
    return HttpResponseRedirect('/accounts/login/')

class Perfil(LoginRequiredMixin, TemplateView):
    template_name = 'perfil/perfil_user.html'

    def get_context_data(self, **kwargs):
        #contextos para validar si existen las reservas
        context = super(Perfil, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        context['n_reservaciones'] = ReservaDeporte.objects.filter(usuario = self.request.user,estado=True).count() + ReservaTurismo.objects.filter(usuario = self.request.user,estado=True).count() + ReservaPlato.objects.filter(usuario = self.request.user,estado=True).count() + ReservaHotel.objects.filter(usuario = self.request.user,estado=True).count()
        context['n_usuarios'] = Usuario.objects.all().count()
        
        fecha_actual = datetime.today()
        reserva1 = ReservaHotel.objects.filter(fecha_inicial__gte = fecha_actual,estado=True, activado = False).count()
        reserva2 = ReservaPlato.objects.filter(fecha_inicial__gte = fecha_actual,estado=True, activado = False).count()
        reserva3 = ReservaTurismo.objects.filter(fecha_inicial__gte = fecha_actual,estado=True, activado = False).count()
        reserva4 = ReservaDeporte.objects.filter(fecha_inicial__gte = fecha_actual,estado=True, activado = False).count()
        total = reserva1 + reserva2 + reserva3 + reserva4
        context['n_solicitudes_pendientes'] = total

        mes_actual = datetime.now()
        reserva5 = ReservaHotel.objects.filter(estado=True)
        count = 0
        for r in reserva5:
            fecha_inicial = r.fecha_inicial
            if fecha_inicial.month == mes_actual.month:
                count = count + 1

        reserva6 = ReservaPlato.objects.filter(estado=True)
        count1 = 0
        for r in reserva6:
            fecha_inicial = r.fecha_inicial
            if fecha_inicial.month == mes_actual.month:
                count1 = count1 + 1

        reserva7 = ReservaTurismo.objects.filter(estado=True)
        count2 = 0
        for r in reserva7:
            fecha_inicial = r.fecha_inicial
            if fecha_inicial.month == mes_actual.month:
                count2 = count2 + 1

        reserva8 = ReservaDeporte.objects.filter(estado=True)
        count3 = 0
        for r in reserva8:
            fecha_inicial = r.fecha_inicial
            if fecha_inicial.month == mes_actual.month:
                count3 = count3 + 1


        context['n_reservas_mes_actual'] = count + count1 + count2 + count

        #de usuario cliente
        visitado = ReservaDeporte.objects.filter(fecha_inicial__lte = fecha_actual,usuario = self.request.user, visita = True).count()
        visitado1 = ReservaPlato.objects.filter(fecha_inicial__lte = fecha_actual,usuario = self.request.user, visita = True).count()
        visitado2 = ReservaHotel.objects.filter(fecha_inicial__lte = fecha_actual,usuario = self.request.user, visita = True).count()
        visitado3 = ReservaTurismo.objects.filter(fecha_inicial__lte = fecha_actual,usuario = self.request.user, visita = True).count()

        pendiente =  ReservaDeporte.objects.filter(fecha_inicial__gte = fecha_actual,usuario = self.request.user).count()
        pendiente1 =  ReservaPlato.objects.filter(fecha_inicial__gte = fecha_actual,usuario = self.request.user).count()
        pendiente2 =  ReservaHotel.objects.filter(fecha_inicial__gte = fecha_actual,usuario = self.request.user).count()
        pendiente3 =  ReservaTurismo.objects.filter(fecha_inicial__gte = fecha_actual,usuario = self.request.user).count()

        sin_visitar = ReservaDeporte.objects.filter(fecha_inicial__lt = fecha_actual,usuario = self.request.user, visita = False).count()
        sin_visitar1 = ReservaPlato.objects.filter(fecha_inicial__lt = fecha_actual,usuario = self.request.user, visita = False).count()
        sin_visitar2 = ReservaHotel.objects.filter(fecha_inicial__lt = fecha_actual,usuario = self.request.user, visita = False).count()
        sin_visitar3 = ReservaTurismo.objects.filter(fecha_inicial__lt = fecha_actual,usuario = self.request.user, visita = False).count()

        context['pendiente'] = pendiente + pendiente1 + pendiente2 + pendiente3
        context['sin_visitar'] = sin_visitar + sin_visitar1 + sin_visitar2 + sin_visitar3
        context['visitado'] = visitado + visitado1 + visitado2 + visitado3
        return context

'''class PerfilDatos(TemplateView):
    template_name = 'perfil/perfil_datos.html'
    '''
'''Inicio listado de reservas de admin'''
#hoteles
class PerfilListarReservasHotelesAdmin(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'perfil/reservas_admin/hoteles/perfil_listarReservasHoteles.html'

    def get_context_data(self, **kwargs):
        context = super(PerfilListarReservasHotelesAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        return context

class ListarReservasHotelesAdmin(LoginAndSuperStaffMixin,ListView):
    model = ReservaHotel
    def get_queryset(self):
        #return self.model.objects.filter(usuario = self.request.user)
        fecha_actual = datetime.today()
        return self.model.objects.filter(estado=True,fecha_inicial__lt = fecha_actual)

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_reservas_hoteles')

class HotelPerfilReservaDetallesAdmin(DetailView):
    model = ReservaHotel
    template_name = 'perfil/reservas_admin/hoteles/perfil_ModalReservaHotelDetalles.html'

#deportes
class PerfilListarReservasDeportesAdmin(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'perfil/reservas_admin/deportes/perfil_listarReservasDeportes.html'

    def get_context_data(self, **kwargs):
        context = super(PerfilListarReservasDeportesAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        return context

class ListarReservasDeportesAdmin(LoginAndSuperStaffMixin,ListView):
    model = ReservaDeporte

    def get_queryset(self):
        #return self.model.objects.filter(usuario = self.request.user)
        fecha_actual = datetime.today()
        return self.model.objects.filter(estado = True, fecha_inicial__lt = fecha_actual)

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_reservas_deportes')

class DeportePerfilReservaDetallesAdmin(DetailView):
    model = ReservaDeporte
    template_name = 'perfil/reservas_admin/deportes/perfil_ModalReservaDeporteDetalles.html'

#platos tipicos
class PerfilListarReservasPlatosAdmin(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'perfil/reservas_admin/platos/perfil_listarReservasPlatos.html'

    def get_context_data(self, **kwargs):
        context = super(PerfilListarReservasPlatosAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        return context

class ListarReservasPlatosAdmin(LoginAndSuperStaffMixin,ListView):
    model = ReservaPlato
    def get_queryset(self):
        #return self.model.objects.filter(usuario = self.request.user)
        fecha_actual = datetime.today()
        return self.model.objects.filter(estado=True, fecha_inicial__lt = fecha_actual)

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_reservas_platos')

class PlatoPerfilReservaDetallesAdmin(DetailView):
    model = ReservaPlato
    template_name = 'perfil/reservas_admin/platos/perfil_ModalReservaPlatoDetalles.html'

#Lugares turísticos
class PerfilListarReservasTurismosAdmin(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'perfil/reservas_admin/turismos/perfil_listarReservasTurismos.html'

    def get_context_data(self, **kwargs):
        context = super(PerfilListarReservasTurismosAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        return context

class ListarReservasTurismosAdmin(LoginAndSuperStaffMixin,ListView):
    model = ReservaTurismo
    def get_queryset(self):
        #return self.model.objects.filter(usuario = self.request.user)
        fecha_actual = datetime.today()
        return self.model.objects.filter(estado=True, fecha_inicial__lt = fecha_actual)

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_reservas_turismos')

class TurismoPerfilReservaDetallesAdmin(DetailView):
    model = ReservaTurismo
    template_name = 'perfil/reservas_admin/turismos/perfil_ModalReservaTurismoDetalles.html'

#SOLICITUDES
#solicitudes de reservas
class PerfilListarSolicituedesReservasAdmin(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'perfil/reservas_admin/solicitudes/perfil_listarSolicitudesReservas.html'

    def get_context_data(self, **kwargs):
        #contextos para validar si existen reservas
        context = super(PerfilListarSolicituedesReservasAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        return context

#listar solicitudes de todas las reservas en la tabla
class ListarSolicituedesReservasAdmin(LoginAndSuperStaffMixin,ListView):
    model1 = ReservaDeporte
    model2 = ReservaTurismo
    model3 = ReservaPlato
    model4 = ReservaHotel
    
    def get_queryset(self):
        fecha_actual = datetime.today()
        queryset1 = ReservaDeporte.objects.filter(fecha_inicial__gte = fecha_actual, estado = True)
        queryset2 = ReservaTurismo.objects.filter(fecha_inicial__gte = fecha_actual, estado = True)
        queryset3 = ReservaPlato.objects.filter(fecha_inicial__gte = fecha_actual, estado = True)
        queryset4 = ReservaHotel.objects.filter(fecha_inicial__gte = fecha_actual, estado = True)
        return list(itertools.chain(queryset1, queryset2, queryset3, queryset4))

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_solicitudes_reservas')

#enumerar solicitudes de todas las reservas en el menu de perfil
class SolicitudesReservasAdmin(LoginAndSuperStaffMixin, ListView):
    model = Usuario
    def get_queryset(self):
        return self.model.objects.filter(is_active=True, id=self.request.user.id)

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_solicitudes_reservas')
#reducir solicitud en tiempo real a cero
class SolicitudCero(CreateView):
    model = Usuario

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            print("estamos en vies solicitud")
            cero = request.POST.get('cero')
            usuario = self.model.objects.get(id = request.user.id)
            usuario.solicitud = 0
            usuario.save()
            mensaje = "Solicitud reducido"
            error = 'No hay error!'
            response = JsonResponse({'mensaje':mensaje,'error':error})
            response.status_code = 201
            return response


#NOTIFICACIONES
#Listar notificaciones del usuario logeado
class NotificacionesUser(ListView):
    model = Usuario
    def get_queryset(self):
        queryset = Notificacion.objects.filter(destinatario=self.request.user)[:4]
        return queryset

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_solicitudes_reservas')
#buscar las notificaciones -> en prueba
class BuscarNotificaciones(CreateView):
    model = Usuario

    def post(self,request,*args,**kwargs):
        if request.is_ajax():
            pk = request.POST.get('pk')
            comentario = Comentario.objects.filter(id=pk)
            data = []
            for com in comentario:
                data.append({
                    'nombres': com.usuario.nombres,
                    'apellidos': com.usuario.apellidos,
                    'publicacion': com.publicacion.nombre,
                    'comentario': com.comentario,
                    'created': com.created
                    })
            mensaje = "buscando notificacion"
            return JsonResponse({'data':data})

#enumerar notificacion en tiempo real cuando el admin aya aceptado la reserva
class NotificacionConfirmReserva(ListView):
    model = Usuario
    def get_queryset(self):
        return self.model.objects.filter(is_active=True, id=self.request.user.id)

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset(),use_natural_foreign_keys = True), 'application/json')

        else:
            return redirect('templates_perfil:inicio_solicitudes_reservas')

#reducir notificacion en tiempo real a cero
class NotificacionCero(CreateView):
    model = Usuario

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            cero = request.POST.get('cero')
            usuario = self.model.objects.get(id = request.user.id)
            usuario.notificacion = 0
            usuario.save()
            mensaje = "Notificacion reducido"
            error = 'No hay error!'
            response = JsonResponse({'mensaje':mensaje,'error':error})
            response.status_code = 201
            return response
'''Fin listado de reservas de admin'''

'''Inicio listado de reservas de Usuarios como clientes'''
#all
import itertools 
class ListarReservasUser(LoginRequiredMixin,ListView):
    model1 = ReservaDeporte
    model2 = ReservaTurismo
    model3 = ReservaPlato
    model4 = ReservaHotel

    paginate_by = 3
    template_name = 'perfil/reservas_user/perfil_listarReservasUser.html'

    def get_queryset(self):
        queryset1 = ReservaDeporte.objects.filter(usuario = self.request.user,estado=True)
        queryset2 = ReservaTurismo.objects.filter(usuario = self.request.user,estado=True)
        queryset3 = ReservaPlato.objects.filter(usuario = self.request.user,estado=True)
        queryset4 = ReservaHotel.objects.filter(usuario = self.request.user,estado=True)
        return list(itertools.chain(queryset1, queryset2, queryset3, queryset4))

    def get_context_data(self, **kwargs):
        context = super(ListarReservasUser, self).get_context_data(**kwargs)
        context['reserva_deportes_user'] = ReservaDeporte.objects.filter(usuario = self.request.user,estado=True)
        context['reserva_turismos_user'] = ReservaTurismo.objects.filter(usuario = self.request.user,estado=True)
        context['reserva_platos_user'] = ReservaPlato.objects.filter(usuario = self.request.user,estado=True)
        context['reserva_hoteles_user'] = ReservaHotel.objects.filter(usuario = self.request.user,estado=True)
        context['n_reservaciones'] = ReservaDeporte.objects.filter(usuario = self.request.user,estado=True).count() + ReservaTurismo.objects.filter(usuario = self.request.user,estado=True).count() + ReservaPlato.objects.filter(usuario = self.request.user,estado=True).count() + ReservaHotel.objects.filter(usuario = self.request.user,estado=True).count()
        return context

class DeportePerfilReservaDetallesUser(LoginRequiredMixin, DetailView):
    model = ReservaDeporte
    template_name = 'perfil/reservas_user/deportes/perfil_ModalReservaDeporteDetalles.html'
'''Fin listado de reservas de Usuarios como clientes'''


'''Reservas chatbot'''
class ListarHotelesModal(ListView):
    model = Hotel

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Hotel.objects.filter(estado = True, publico = True).values()
            response = JsonResponse({'turismo':list(turismo)})
            response.status_code = 201
            return response

class HotelDetallesChatbot(DetailView):
    model = Hotel
    template_name = 'perfil/chatbot/chatbot_ReservarHotel.html'

    def get_context_data(self, **kwargs):
        context = super(HotelDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaHotel.objects.filter(estado=True)
        return context

class ListarDeportesModal(ListView):
    model = Deporte

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Deporte.objects.filter(estado = True, publico = True).values()
            response = JsonResponse({'turismo':list(turismo)})
            response.status_code = 201
            return response

class DeporteDetallesChatbot(DetailView):
    model = Deporte
    template_name = 'perfil/chatbot/chatbot_ReservarDeporte.html'

    def get_context_data(self, **kwargs):
        context = super(DeporteDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaDeporte.objects.filter(estado=True)
        return context

class ListarTurismosModal(ListView):
    model = Turismo

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Turismo.objects.filter(estado = True, publico = True).values()
            response = JsonResponse({'turismo':list(turismo)})
            response.status_code = 201
            return response

class TurismoDetallesChatbot(DetailView):
    model = Turismo
    template_name = 'perfil/chatbot/chatbot_ReservarTurismo.html'

    def get_context_data(self, **kwargs):
        context = super(TurismoDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaTurismo.objects.filter(estado=True)
        return context

class ListarPlatosModal(ListView):
    model = Plato

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Plato.objects.filter(estado = True, publico = True, cantidad__gt = 0).values()
            response = JsonResponse({'turismo':list(turismo)})
            response.status_code = 201
            return response

class PlatoDetallesChatbot(DetailView):
    model = Plato
    template_name = 'perfil/chatbot/chatbot_ReservarPlato.html'

    def get_context_data(self, **kwargs):
        context = super(PlatoDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaPlato.objects.filter(estado=True)
        return context

#sugerencias de cada tabla de turismo
class SugerenciasHotel(ListView):
    model = Hotel

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Hotel.objects.values('id','nombre').annotate(num=Count('reservahotel'))
            valor = Hotel.objects.values('nombre').annotate(num=Count('reservahotel')).aggregate(Max('num'))

            for tur in turismo:
                maxi = tur['num']
                if maxi == valor['num__max']:
                    temp = tur
                    print(temp)

            response = JsonResponse({'sugerencia':temp})
            response.status_code = 201
            return response

class SugerenciasHotelDetallesChatbot(DetailView):
    model = Hotel
    template_name = 'perfil/chatbot/sugerencias/sugerencia_chatbotHotel.html'

    def get_context_data(self, **kwargs):
        context = super(SugerenciasHotelDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaHotel.objects.filter(estado=True)
        return context

class SugerenciasDeporte(ListView):
    model = Deporte

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Deporte.objects.values('id','nombre').annotate(num=Count('reservadeporte'))
            valor = Deporte.objects.values('nombre').annotate(num=Count('reservadeporte')).aggregate(Max('num'))

            for tur in turismo:
                maxi = tur['num']
                if maxi == valor['num__max']:
                    temp = tur

            response = JsonResponse({'sugerencia':temp})
            response.status_code = 201
            return response

class SugerenciasDeporteDetallesChatbot(DetailView):
    model = Deporte
    template_name = 'perfil/chatbot/sugerencias/sugerencia_chatbotDeporte.html'

    def get_context_data(self, **kwargs):
        context = super(SugerenciasDeporteDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaDeporte.objects.filter(estado=True)
        return context

class SugerenciasTurismo(ListView):
    model = Turismo

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Turismo.objects.values('id','nombre').annotate(num=Count('reservaturismo'))
            valor = Turismo.objects.values('nombre').annotate(num=Count('reservaturismo')).aggregate(Max('num'))

            for tur in turismo:
                maxi = tur['num']
                if maxi == valor['num__max']:
                    temp = tur

            response = JsonResponse({'sugerencia':temp})
            response.status_code = 201
            return response

class SugerenciasTurismoDetallesChatbot(DetailView):
    model = Turismo
    template_name = 'perfil/chatbot/sugerencias/sugerencia_chatbotTurismo.html'

    def get_context_data(self, **kwargs):
        context = super(SugerenciasTurismoDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaTurismo.objects.filter(estado=True)
        return context

class SugerenciasPlato(ListView):
    model = Plato

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            turismo = Plato.objects.values('id','nombre').annotate(num=Count('reservaplato'))
            valor = Plato.objects.values('nombre').annotate(num=Count('reservaplato')).aggregate(Max('num'))

            for tur in turismo:
                maxi = tur['num']
                if maxi == valor['num__max']:
                    temp = tur

            response = JsonResponse({'sugerencia':temp})
            response.status_code = 201
            return response

class SugerenciasPlatoDetallesChatbot(DetailView):
    model = Plato
    template_name = 'perfil/chatbot/sugerencias/sugerencia_chatbotPlato.html'

    def get_context_data(self, **kwargs):
        context = super(SugerenciasPlatoDetallesChatbot, self).get_context_data(**kwargs)
        context['reserva'] = ReservaPlato.objects.filter(estado=True)
        return context
'''FIN Reservas chatbot'''

'''INICIO Calendario'''
class PerfilCalendarioAdmin(LoginAndSuperStaffMixin, ListView):
    template_name = 'perfil/extras/calendario/calendario_admin.html'

    #el def get_queryset no esta ahciendo nada,se le agrego  porque listview lo pide
    def get_queryset(self):
        queryset1 = ReservaDeporte.objects.filter(estado=True)
        return queryset1

    def get_context_data(self, **kwargs):
        #contextos para validar si existen las reservas
        context = super(PerfilCalendarioAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        context['n_reservaciones'] = ReservaDeporte.objects.filter(usuario = self.request.user,estado=True).count() + ReservaTurismo.objects.filter(usuario = self.request.user,estado=True).count() + ReservaPlato.objects.filter(usuario = self.request.user,estado=True).count() + ReservaHotel.objects.filter(usuario = self.request.user,estado=True).count()
        return context
'''FIN Calendario'''

'''INICIO inteligencia de negocios'''
class PerfilAnalisisAdmin(LoginAndSuperStaffMixin, TemplateView):
    template_name = 'perfil/extras/analisis/analisis_admin.html'

    def get_context_data(self, **kwargs):
        #contextos para validar si existen las reservas
        print("aqui estoy dentro")
        context = super(PerfilAnalisisAdmin, self).get_context_data(**kwargs)
        context['reserva_deportes'] = ReservaDeporte.objects.filter(estado=True)
        context['reserva_hoteles'] = ReservaHotel.objects.filter(estado=True)
        context['reserva_platos'] = ReservaPlato.objects.filter(estado=True)
        context['reserva_turismos'] = ReservaTurismo.objects.filter(estado=True)
        context['n_reservaciones'] = ReservaDeporte.objects.filter(usuario = self.request.user,estado=True).count() + ReservaTurismo.objects.filter(usuario = self.request.user,estado=True).count() + ReservaPlato.objects.filter(usuario = self.request.user,estado=True).count() + ReservaHotel.objects.filter(usuario = self.request.user,estado=True).count()
        return context

class PerfilBarrasAnalisisAdmin(LoginAndSuperStaffMixin, TemplateView):
    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            year = request.POST.get('year')
            selectedReporte = request.POST.get('selectedReporte')
            if selectedReporte == 'general':
                data1 = []
                data2 = []
                data3 = []
                data4 = []

                for mes in range(1,13):
                    totalReservaHotel = ReservaHotel.objects.filter(fecha_inicial__year=year, fecha_inicial__month=mes).count()
                    totalReservaDeporte = ReservaDeporte.objects.filter(fecha_inicial__year=year, fecha_inicial__month=mes).count()
                    totalReservaTurismo = ReservaTurismo.objects.filter(fecha_inicial__year=year, fecha_inicial__month=mes).count()
                    totalReservaPlato = ReservaPlato.objects.filter(fecha_inicial__year=year, fecha_inicial__month=mes).count()

                    data1.append(float(totalReservaHotel))
                    data2.append(float(totalReservaDeporte))
                    data3.append(float(totalReservaTurismo))
                    data4.append(float(totalReservaPlato))

                selected = "general"
                response = JsonResponse({'selected':selected, 'hotel':data1, 'deporte':data2, 'turismo':data3, 'plato':data4})
                response.status_code = 201
            elif selectedReporte == 'cabaña':
                hotel = Hotel.objects.filter(estado=True)
                hotel1 = Hotel.objects.filter(estado=True).values()
                data5 = []
                data6 = []
                for hot in hotel:
                    data5.append(hot.id)

                meseYear = [1,2,3,4,5,6,7,8,9,10,11,12]
                for x in range(len(meseYear)):
                    data6.append([])
                    for i in data5:
                        totalReservaHotel = ReservaHotel.objects.filter(fecha_inicial__year=year, fecha_inicial__month=meseYear[x], hotel=i).count()
                        data6[x].append(float(totalReservaHotel))

                temp = []
                diccionario = {}
                for x,y in enumerate(data5):
                    temp.append([row[x] for row in data6])

                for i,x in enumerate(temp):
                    diccionario[i]=x

                selected = "hotel"
                response = JsonResponse({'selected':selected,'diccionario':diccionario,'hotel':list(hotel1)})
                response.status_code = 201

            elif selectedReporte == 'deporte':
                deporte = Deporte.objects.filter(estado=True)
                deporte1 = Deporte.objects.filter(estado=True).values()
                data5 = []
                data6 = []
                for depor in deporte:
                    data5.append(depor.id)

                meseYear = [1,2,3,4,5,6,7,8,9,10,11,12]
                for x in range(len(meseYear)):
                    data6.append([])
                    for i in data5:
                        totalReservaDeporte = ReservaDeporte.objects.filter(fecha_inicial__year=year, fecha_inicial__month=meseYear[x], deporte=i).count()
                        data6[x].append(float(totalReservaDeporte))

                temp = []
                diccionario = {}
                for x,y in enumerate(data5):
                    temp.append([row[x] for row in data6])

                for i,x in enumerate(temp):
                    diccionario[i]=x

                selected = "deporte"
                response = JsonResponse({'selected':selected,'diccionario':diccionario,'deporte':list(deporte1)})
                response.status_code = 201

            elif selectedReporte == 'plato':
                plato = Plato.objects.filter(estado=True)
                plato1 = Plato.objects.filter(estado=True).values()
                data5 = []
                data6 = []
                for pla in plato:
                    data5.append(pla.id)

                meseYear = [1,2,3,4,5,6,7,8,9,10,11,12]
                for x in range(len(meseYear)):
                    data6.append([])
                    for i in data5:
                        totalReservaPlato = ReservaPlato.objects.filter(fecha_inicial__year=year, fecha_inicial__month=meseYear[x], plato=i).count()
                        data6[x].append(float(totalReservaPlato))

                temp = []
                diccionario = {}
                for x,y in enumerate(data5):
                    temp.append([row[x] for row in data6])

                for i,x in enumerate(temp):
                    diccionario[i]=x

                selected = "plato"
                response = JsonResponse({'selected':selected,'diccionario':diccionario,'plato':list(plato1)})
                response.status_code = 201

            elif selectedReporte == 'turismo':
                turismo = Turismo.objects.filter(estado=True)
                turismo1 = Turismo.objects.filter(estado=True).values()
                data5 = []
                data6 = []
                for tur in turismo:
                    data5.append(tur.id)

                meseYear = [1,2,3,4,5,6,7,8,9,10,11,12]
                for x in range(len(meseYear)):
                    data6.append([])
                    for i in data5:
                        totalReservaTurismo = ReservaTurismo.objects.filter(fecha_inicial__year=year, fecha_inicial__month=meseYear[x], turismo=i).count()
                        data6[x].append(float(totalReservaTurismo))

                temp = []
                diccionario = {}
                for x,y in enumerate(data5):
                    temp.append([row[x] for row in data6])

                for i,x in enumerate(temp):
                    diccionario[i]=x

                selected = "turismo"
                response = JsonResponse({'selected':selected,'diccionario':diccionario,'turismo':list(turismo1)})
                response.status_code = 201
            return response

class PerfilCircularAnalisisAdmin(LoginAndSuperStaffMixin, TemplateView):
    def post(self,request,*args,**kwargs):
        if request.is_ajax():
            year = request.POST.get('year')
            month = datetime.now().month
            data = []
            for hotel in Hotel.objects.filter(estado=True):
                totalReservaHotel = ReservaHotel.objects.filter(estado=True,fecha_inicial__year=year, fecha_inicial__month=month, hotel=hotel.id).count()
                data.append({
                    'name': hotel.nombre,
                    'y': float(totalReservaHotel)
                })

            for deporte in Deporte.objects.filter(estado=True):
                totalReservaDeporte = ReservaDeporte.objects.filter(estado=True,fecha_inicial__year=year, fecha_inicial__month=month, deporte=deporte.id).count()
                data.append({
                    'name': deporte.nombre,
                    'y': float(totalReservaDeporte)
                })
            
            for plato in Plato.objects.filter(estado=True):
                totalReservaPlato = ReservaPlato.objects.filter(estado=True,fecha_inicial__year=year, fecha_inicial__month=month, plato=plato.id).count()
                data.append({
                    'name': plato.nombre,
                    'y': float(totalReservaPlato)
                })

            for turismo in Turismo.objects.filter(estado=True):
                totalReservaTurismo = ReservaTurismo.objects.filter(estado=True,fecha_inicial__year=year, fecha_inicial__month=month, turismo=turismo.id).count()
                data.append({
                    'name': turismo.nombre,
                    'y': float(totalReservaTurismo)
                })

            response = JsonResponse({'data':data})
            response.status_code = 201
            return response
'''FIN inteligencia de negocios'''
#editar imagenes de home
class ListarImagenesHome(ListView):
    model = Imagehome

    def get_queryset(self):
        queryset = Imagehome.objects.all()
        return queryset

    def get(self,request,*args,**kwargs):
        if request.is_ajax():
            return HttpResponse(serialize('json', self.get_queryset()), 'application/json')

        else:
            return redirect('templates_perfil:perfil')

class EditarImagenesHome(LoginAndSuperStaffMixin,UpdateView):
    model = Imagehome
    form_class = ImagehomeForm
    template_name = 'perfil/editar_home/perfil_ModalEditarImageHome.html'

    def post(self, request, *args, **kwargs):
        if request.is_ajax():
            form = self.form_class(data=request.POST,files=request.FILES,instance = self.get_object())
            if form.is_valid():
                obj = form.save(commit=False)
                obj.user_id = request.user
                obj.save()
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
            return redirect('templates_perfil:listar_imagenes_home')