//funciona para listar platos con peticion ajax
var $ = jQuery.noConflict();
function listarPublicaciones(){
    $.ajax({
        url: "/home/publicaciones/",
        type: "get",
        dataType: "json",
        success: function(response){
            for(let i = 0;i < response.length;i++){
				let contenedor = '<div>';

				contenedor += '<div class="blog_item_img">\n\
								<img class="card-img rounded-0" src="/media/'+ response[i]["fields"]['imagen']+'"/>\n\
								<a href="#" class="blog_item_date">\n\
									<h3>15</h3>\n\
							        <p>Jan</p>\n\
							    </a>\n\
							    </div>\n\
								<div class="blog_details">\n\
									<a class="d-inline-block" href="single-blog.html">\n\
										<h2>' + response[i]["fields"]['nombre']+'</h2>\n\
									</a>\n\
									<p>' + response[i]["fields"]['descripcion']+'</p>\n\
									<ul class="blog-info-link">\n\
							            <li><a href="#"><i class="fa fa-user"></i> Travel, Lifestyle</a></li>\n\
							            <li><a href="#"><i class="fa fa-comments"></i> 03 Comments</a></li>\n\
							        </ul>\n\
								</div>';

				contenedor += '</div>';
				$('#article-publicacion').append(contenedor);
			}
        },
        error: function(error){
            console.log(error);
        }
    });
}
//funcion que me permite llamar a la funcion de peticion ajax, en este caso listar platos
$(document).ready(function(){
    listarPublicaciones();
});
//funcion para agregar plato
function registrarPlato(){
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
			listarPlatos();
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
function editarPlato(){
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
			listarPlatos();
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

//funcion para eliminar la reserva del hotel por user admin
function eliminarSweetAlertPlato(pk){
	Swal.fire({
	  title: 'Estas seguro?',
	  text: "Despues de eliminar el registro del plato típico, no podras revertir los cambios!",
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
			url: '/perfil_admin/eliminar_plato/'+pk+'/',
			type: 'post',
			success: function(response){
				Swal.fire({
				  icon: 'success',
				  title: 'El plato típico ha sido eliminado',
				  showConfirmButton: false,
				  timer: 1500
				})
				listarPlatos();
			},
			error: function(error){
				sweetError(error.responseJSON.mensaje);
			}
		});
	  }
	})
}