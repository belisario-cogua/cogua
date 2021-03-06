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
	#path('activate/<slug:uidb64>/<slug:token>/', activate, name='activate'),

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
	path('chatbot/listar_hoteles/', ListarHotelesModal.as_view(), name = 'listar_hoteles_chatbot'),
	path('chatbot/detalles_hotel/<int:pk>/',HotelDetallesChatbot.as_view(), name='chatbot_hotel_detalles'),
	path('chatbot/listar_deportes/', ListarDeportesModal.as_view(), name = 'listar_deportes_chatbot'),
	path('chatbot/detalles_deporte/<int:pk>/',DeporteDetallesChatbot.as_view(), name='chatbot_deporte_detalles'),
	path('chatbot/listar_turismos/', ListarTurismosModal.as_view(), name = 'listar_turismos_chatbot'),
	path('chatbot/detalles_turismo/<int:pk>/',TurismoDetallesChatbot.as_view(), name='chatbot_turismo_detalles'),
	path('chatbot/listar_platos/', ListarPlatosModal.as_view(), name = 'listar_platos_chatbot'),
	path('chatbot/detalles_plato/<int:pk>/',PlatoDetallesChatbot.as_view(), name='chatbot_plato_detalles'),

	path('chatbot/sugerencia_hotel/',SugerenciasHotel.as_view(), name='sugerencia_chatbot_hotel'),
	path('chatbot/detallles_sugerencia_hotel/<int:pk>/',SugerenciasHotelDetallesChatbot.as_view(), name='sugerencia_chatbot_hotel_detalles'),
	path('chatbot/sugerencia_deporte/',SugerenciasDeporte.as_view(), name='sugerencia_chatbot_deporte'),
	path('chatbot/detallles_sugerencia_deporte/<int:pk>/',SugerenciasDeporteDetallesChatbot.as_view(), name='sugerencia_chatbot_deporte_detalles'),
	path('chatbot/sugerencia_turismo/',SugerenciasTurismo.as_view(), name='sugerencia_chatbot_turismo'),
	path('chatbot/detallles_sugerencia_turismo/<int:pk>/',SugerenciasTurismoDetallesChatbot.as_view(), name='sugerencia_chatbot_turismo_detalles'),
	path('chatbot/sugerencia_plato/',SugerenciasPlato.as_view(), name='sugerencia_chatbot_plato'),
	path('chatbot/detallles_sugerencia_plato/<int:pk>/',SugerenciasPlatoDetallesChatbot.as_view(), name='sugerencia_chatbot_plato_detalles'),
	#urls para extra de perfil
	#calendario
	path('perfil/calendario_admin/reservas/', PerfilCalendarioAdmin.as_view(), name = 'calendario_admin'),
	#inteligencia de negocios
	path('perfil/analisis_admin/reservas/', PerfilAnalisisAdmin.as_view(), name = 'analisis_admin'),
	path('perfil/barras_analisis_admin/reservas/', PerfilBarrasAnalisisAdmin.as_view(), name = 'barras_analisis_admin'),
	path('perfil/circular_analisis_admin/reservas/', PerfilCircularAnalisisAdmin.as_view(), name = 'circular_analisis_admin'),

	#EditarImagenes
	path('perfil/listar_imagenes/home/', ListarImagenesHome.as_view(), name = 'listar_imagenes_home'),
	path('perfil/editar_imagen_home/<int:pk>/',EditarImagenesHome.as_view(), name = 'editar_imagen_home'),

	#Ayuda
	path('admin/ayuda/',PerfilAyudaAdmin.as_view(), name='ayuda'),
]