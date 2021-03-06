#archivo creado manualmente
from django.urls import path
from .views import *

urlpatterns = [
	path('',Home.as_view(), name='index'),
	path('home/publicaciones/',ListarPublicaciones.as_view(), name = 'listar_publicaciones_home'),
	path('home/publicaciones/recientes/',ListarPublicacionesRecientes.as_view(), name = 'listar_publicaciones_recientes_home'),
	path('home/detalle/publicacion/<int:pk>/',PublicacionDetalles.as_view(), name='publicacion_detalles'),
	path('home/publicacion/comentarios/',ListarComentarios.as_view(), name='publicacion_comentarios'),
	path('home/agregar_comentario/',AgregarComentario.as_view(), name='agregar_comentario'),

	path('home-deporte_detalles/<int:pk>/',DeporteDetalles.as_view(), name='deporte_detalles'),
	path('listado-deportes-disponibles/',ListarDeportesDisponibles.as_view(), name='listado_deportes_disponibles'),
	path('listado-cabañas-disponibles/',ListarHotelesDisponibles.as_view(), name='listado_hoteles_disponibles'),
	path('listado-platos-tipicos-disponibles/',ListarPlatosDisponibles.as_view(), name='listado_platos_disponibles'),
	path('listado-lugares-turisticos-disponibles/',ListarTurismosDisponibles.as_view(), name='listado_turismos_disponibles'),
]