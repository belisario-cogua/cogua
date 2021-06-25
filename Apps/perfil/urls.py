#archivo creado manualmente
from django.urls import path
from .views import *
#from .views import Perfil,PerfilListarReservasDeportesAdmin,  ListarReservasDeportesAdmin, DeportePerfilReservaDetallesAdmin
#from .views import PerfilListarReservasHotelesAdmin,  ListarReservasHotelesAdmin, HotelPerfilReservaDetallesAdmin
#from .views import PerfilListarReservasPlatosAdmin,  ListarReservasPlatosAdmin, PlatoPerfilReservaDetallesAdmin
#from .views import PerfilListarReservasTurismosAdmin,  ListarReservasTurismosAdmin, TurismoPerfilReservaDetallesAdmin
#from .views import ListarReservasDeportesUser, DeportePerfilReservaDetallesUser
from django.contrib.auth.decorators import login_required

urlpatterns = [
	#url para confirmar el email
	path('activate/<slug:uidb64>/<slug:token>/', activate, name='activate'),

	path('perfil/',Perfil.as_view(), name='perfil'),
	#url para editar ussuario actual
	path('perfil/editar_perfil/', EditarUserActual.as_view(), name='editar_perfil_actual'),
	path('perfil/editar_password_perfil/', EditarPasswordUserActual.as_view(), name='editar_perfil_password_actual'),
	#urls para mostrar reservas de user como admin en perfil
	path('perfil_admin/solicitudes/reservas/',PerfilListarSolicituedesReservasAdmin.as_view(), name='inicio_solicitudes_reservas'),
	path('perfil_admin/listar_solicitudes_reservas/',ListarSolicituedesReservasAdmin.as_view(), name='listar_solicitudes_reservas'),

	path('perfil_admin/reservas/deportes/',PerfilListarReservasDeportesAdmin.as_view(), name='inicio_reservas_deportes'),
	path('perfil_admin/listar_reservas_deportes/', ListarReservasDeportesAdmin.as_view(), name = 'listar_reservas_deportes'),
	path('perfil_admin/reserva_detalles_deporte/<int:pk>/',DeportePerfilReservaDetallesAdmin.as_view(), name = 'reserva_detalles_deporte'),

	path('perfil_admin/reservas/hoteles/',PerfilListarReservasHotelesAdmin.as_view(), name='inicio_reservas_hoteles'),
	path('perfil_admin/listar_reservas_hoteles/', ListarReservasHotelesAdmin.as_view(), name = 'listar_reservas_hoteles'),
	path('perfil_admin/reserva_detalles_hotel/<int:pk>/',HotelPerfilReservaDetallesAdmin.as_view(), name = 'reserva_detalles_hotel'),

	path('perfil_admin/reservas/platos/',PerfilListarReservasPlatosAdmin.as_view(), name='inicio_reservas_platos'),
	path('perfil_admin/listar_reservas_platos/', ListarReservasPlatosAdmin.as_view(), name = 'listar_reservas_platos'),
	path('perfil_admin/reserva_detalles_plato/<int:pk>/',PlatoPerfilReservaDetallesAdmin.as_view(), name = 'reserva_detalles_plato'),

	path('perfil_admin/reservas/turismos/',PerfilListarReservasTurismosAdmin.as_view(), name='inicio_reservas_turismos'),
	path('perfil_admin/listar_reservas_turismos/', ListarReservasTurismosAdmin.as_view(), name = 'listar_reservas_turismos'),
	path('perfil_admin/reserva_detalles_turismo/<int:pk>/',TurismoPerfilReservaDetallesAdmin.as_view(), name = 'reserva_detalles_turismo'),

	#SOLICITUDES
	#url para notificar el numero de solicitudes de todas las reservas
	path('perfil/solicitudes_reservas_admin/', SolicitudesReservasAdmin.as_view(), name='solicitudes_reservas_admin'),
	path('perfil/solicitud_confirm_cero/', SolicitudCero.as_view(), name='solicitud_confirm_cero'),
	path('perfil/enumerar_solicitudes_total/', EnumerarSolicitudesReservasAdmin.as_view(), name='enumerar_solicitudes_total'),

	#NOTIFICACIONES
	#url para notificar el numero de notificaciones de reservas aceptadas
	path('perfil/notificaciones/', NotificacionesUser.as_view(), name='notificaciones'),
	path('perfil/notificacion_confirm_reserva/', NotificacionConfirmReserva.as_view(), name='notificacion_confirm_reservan'),
	path('perfil/notificacion_confirm_cero/', NotificacionCero.as_view(), name='notificacion_confirm_cero'),
	path('perfil/bucar_notificaciones/', BuscarNotificaciones.as_view(), name='buscar_notificaciones'),

	#urls para reservas de user en perfil
	path('perfil/listar_mis_reservas/', ListarReservasUser.as_view(), name = 'listar_reservas_user_deportes'),
	path('perfil/reserva_detalles_deporte/<int:pk>/',DeportePerfilReservaDetallesUser.as_view(), name = 'reserva_detalles_user_deporte'),

	#urls para reservar desde el chatbot
	path('perfil/chatbot/', ChatBot.as_view(), name = 'chatbot'),
	path('perfil/reservar_turismo_chatbot/', ReservaTurismoChatbot.as_view(), name = 'reserva_turismo_chatbot'),
	path('perfil/reservar_deporte_chatbot/', ReservaDeporteChatbot.as_view(), name = 'reserva_deporte_chatbot'),
	path('perfil/reservar_plato_chatbot/', ReservaPlatoChatbot.as_view(), name = 'reserva_plato_chatbot'),

	#urls para extra de perfil
	#calendario
	path('perfil/calendario_admin/reservas/', PerfilCalendarioAdmin.as_view(), name = 'calendario_admin'),
	#inteligencia de negocios
	path('perfil/analisis_admin/reservas/', PerfilAnalisisAdmin.as_view(), name = 'analisis_admin'),
	path('perfil/barras_analisis_admin/reservas/', PerfilBarrasAnalisisAdmin.as_view(), name = 'barras_analisis_admin'),
	path('perfil/circular_analisis_admin/reservas/', PerfilCircularAnalisisAdmin.as_view(), name = 'circular_analisis_admin'),

]