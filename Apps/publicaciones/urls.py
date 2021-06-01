from django.urls import path
from .views import *

urlpatterns = [
	path('perfil_admin/agregar_publicacion/',AgregarPublicacion.as_view(), name = 'agregar_publicacion'),
	path('perfil_admin/publicaciones/', PerfilListarPublicaciones.as_view(), name='inicio_publicaciones'),
	path('perfil_admin/listar_publicaciones/',ListarPublicaciones.as_view(), name = 'listar_publicaciones'),
	path('perfil_admin/detalles_publicacion/<int:pk>/',PublicacionPerfilDetalles.as_view(), name = 'detalles_publicacion'),
	path('perfil_admin/editar_publicacion/<int:pk>/',EditarPublicacion.as_view(), name = 'editar_publicacion'),
	path('perfil_admin/eliminar_publicacion/<int:pk>/',EliminarPublicacion.as_view(), name = 'eliminar_publicacion'),
	
]