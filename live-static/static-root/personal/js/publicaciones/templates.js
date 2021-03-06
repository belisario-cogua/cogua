//funciona para listar turismos con peticion ajax
var $ = jQuery.noConflict();
function listarPublicaciones(){
	$.ajax({
		url: "/perfil_admin/listar_publicaciones/",
		type: "get",
		dataType: "json",
		success: function(response){
			if($.fn.DataTable.isDataTable('#tabla_publicacion')){
				$('#tabla_publicacion ').DataTable().destroy();
			}
			$('#tabla_publicacion tbody').html("");
			for(let i = 0;i < response.length;i++){
				let fila = '<tr>';

				function MaysPrimera(string){
				  return string.charAt(0).toUpperCase() + string.slice(1);
				}
				nombre = response[i]["fields"]['nombre'];
				nombre = MaysPrimera(nombre.toLowerCase());

				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_publicacion/'+response[i]['pk']+'/\');">' + (i+1) + '</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_publicacion/'+response[i]['pk']+'/\');">' + nombre +'</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_publicacion/'+response[i]['pk']+'/\');">' + response[i]["fields"]['descripcion']+'</a></td>';
				if (response[i]["fields"]['imagen']){
					fila += '<td class="text-center fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_publicacion/'+response[i]['pk']+'/\');"><img style="width:30px;height:20px;" src="/media/'+ response[i]["fields"]['imagen']+'"/></a></td>';
				}else{
					fila += '<td class="text-center fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_publicacion/'+response[i]['pk']+'/\');"><img style="width:25px;" src="/static/personal/imagen/empty.png"/></a></td>';
				}
				fila += '<td class="text-center fila-table"><button type="button" class="btn btn-danger btn-xs tableButton cambiar-color-button-eliminar" onclick="eliminarSweetAlertPublicacion(\''+response[i]['pk']+'\',\''+nombre+'\');"><i class="fas fa-trash"></i></button>';
				fila += '<button type="button" class="btn btn-info btn-xs tableButton cambiar-color-button-editar" onclick="abrir_modal_editar(\'/perfil_admin/editar_publicacion/'+response[i]['pk']+'/\');"><i class="fas fa-edit"></i></button>';
				fila += '</tr>';
				$('#tabla_publicacion tbody').append(fila);
			}
			$('#tabla_publicacion').DataTable({
				//estos son parametros que tiene definido el data table internamente
				language: {
		          decimal: "",
		          emptyTable: "No hay informaci??n",
		          info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
		          infoEmpty: "Mostrando 0 a 0 de 0 Entradas",
		          infoFiltered: "(Filtrado de _MAX_ total entradas)",
		          infoPostFix: "",
		          thousands: ",",
		          lengthMenu: "Mostrar _MENU_ Entradas",
		          loadingRecords: "Cargando...",
		          processing: "Procesando...",
		          search: "Buscar:",
		          zeroRecords: "Sin resultados encontrados",
		          paginate: {
		            first: "Primero",
		            last: "Ultimo",
		            next: "Siguiente",
		            previous: "Anterior",
		          },
		        },
			});
		},
		error: function(error){
			console.log(error);
		}
	});
}
//funcion que me permite llamar a la funcion de peticion ajax, en este caso listar turismos
$(document).ready(function(){
	listarPublicaciones();
});
//funcion para agregar lugares turisticos
function registrarPublicacion(){
	// bloquearButton(); es llamado desde main.js
	bloquearButton();
	//
	var data = new FormData($('#form_agregar').get(0));
	$.ajax({
		//el form_agregar es un id y es llamdo desde el template perfil_ModalAgregarUsuario.html
		data: data,
		//obtenemos la ruta que esta en el action
		url: $('#form_agregar').attr('action'),
		//obtenemos el tipo de informacion que esta definido en method
		type: $('#form_agregar').attr('method'),
		cache: false,
		contentType: false,
		processData: false,
		success: function(response){
			//el response.mensaje es llamado desde usuarios/views.py cuando retorna response
			sweetSuccess(response.mensaje);
			//
			listarPublicaciones();
			cerrar_modal_agregar();
		},
		error: function(error){
			//el .mensaje es llamado desde usuarios/views.py cuando retorna response atarvez de responseJSON
			sweetError(error.responseJSON.mensaje);
			//aqui se llama la funcion de mostrarErroresAgregar()
			//que esta en main.js
			mostrarErroresAgregar(error);
			//vuelve a desbloquear el button
			bloquearButton();
		}
	});
}
//funcion para editar plato
function editarPublicacion(){
	bloquearButton();
	var data = new FormData($('#form_editar').get(0));
	$.ajax({
		//el form_editar es un id y es llamdo desde el template perfil_ModalEditarUsuario.html
		data: data,
		url: $('#form_editar').attr('action'),
		type: $('#form_editar').attr('method'),
		cache: false,
		contentType: false,
		processData: false,
		success: function(response){
			sweetSuccess(response.mensaje);
			//
			listarPublicaciones();
			cerrar_modal_editar();
			cerrar_modales_editar();
		},
		error: function(error){
			sweetError(error.responseJSON.mensaje);
			mostrarErroresEditar(error);
			bloquearButton();
		}
	});
}

//funcion para eliminar el lugar turistico
function eliminarSweetAlertPublicacion(pk,nombre){
	Swal.fire({
	  title: 'Estas seguro de eliminar la publicaci??n '+nombre+'?',
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#28a745',
	  confirmButtonText: 'Eliminar',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'Cancelar',
	}).then((result) => {
	  if (result.isConfirmed) {
	    //declaramos la variable csrfftoken con la funcion getCookie
		var csrftoken = getCookie('csrftoken'); 
		$.ajax({
			//atravez de data enviamos el token es decir el {% csrf_token %}
			data:{
				csrfmiddlewaretoken: csrftoken
			},
			url: '/perfil_admin/eliminar_publicacion/'+pk+'/',
			type: 'post',
			success: function(response){
				Swal.fire({
				  icon: 'success',
				  title: 'La publicaci??n ha sido eliminado',
				  showConfirmButton: false,
				  timer: 1500
				})
				listarPublicaciones();
			},
			error: function(error){
				sweetError(error.responseJSON.mensaje);
			}
		});
	  }
	})
}