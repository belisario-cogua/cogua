/*
esta funcion permite que el sweetalert recarge a una direccion de url ya sea si le doy clic
en el button ok o si lo doy click fuera del modal del sweetalert.
success: function(response){
	    Swal.fire({
	      title: 'Un paso más ' + primernombre + '!',
	      html:
	          '<br><b>Revisa tu bandeja de entrada de tu correo electrónico y haz clic en el enlace de cogua para confirmar tu cuenta.</b>'+' <br><br>'+email,
	      icon: 'info',
	      allowOutsideClick: false,
	      confirmButtonText: `OK`
	    }).then((result) => {
	                if (result.isConfirmed) {
	                  window.location.href = response.url;
	                } else {
	                  window.location.href = response.url;
	                }
	              })
	  },
*/
//funciona para listar usuarios con peticion ajax
var $ = jQuery.noConflict();
function listarUsuarios(){
	var contenedor = document.getElementById('contenedor_carga_tabla');
	contenedor.style.visibility = 'visible';
	contenedor.style.opacity = '1';
	$.ajax({
		url: "/perfil_admin/listar_usuarios/",
		type: "get",
		dataType: "json",
		success: function(response){
			contenedor.style.visibility = 'hidden';
        	contenedor.style.opacity = '0';
			if($.fn.DataTable.isDataTable('#tabla_usuarios')){
				$('#tabla_usuarios ').DataTable().destroy();
			}
			$('#tabla_usuarios tbody').html("");
			for(let i = 0;i < response.length;i++){
				let fila = '<tr>';

				var nombres = response[i]["fields"]['nombres'];
				nombres = nombres.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) { 
				    return letter.toUpperCase(); 
				});

				var apellidos = response[i]["fields"]['apellidos'];
				apellidos = apellidos.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) { 
				    return letter.toUpperCase(); 
				}); 
				tempNombres = nombres + ' ' + apellidos;
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');">' + (i+1) + '</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');">' + nombres +'</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');">' + apellidos +'</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');">' + response[i]["fields"]['email']+'</a></td>';
				if (response[i]["fields"]['imagen']){
					fila += '<td class="text-center fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');"><img style="width:30px;height:22px;" src="/media/'+ response[i]["fields"]['imagen']+'"/></a></td>';
				}else{
					fila += '<td class="text-center fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');"><img style="width:25px;" src="/static/personal/imagen/empty.png"/></a></td>';
				}
				if (response[i]["fields"]['is_active']){
					fila += '<td class="text-center fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');"><i class="fas fa-check" style="color: green;"></i></a></td>';
				}else{
					fila += '<td class="text-center fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/detalles_usuario/'+response[i]['pk']+'/\');"><i class="fas fa-times" style="color: red;"></i></td>';
				}
				fila += '<td class="text-center fila-table"><button type="button" class="btn btn-danger btn-xs  tableButton cambiar-color-button-eliminar" onclick="eliminarSweetAlertUsuario(\''+response[i]['pk']+'\',\''+tempNombres+'\');"><i class="fas fa-trash"></i></button>';
				fila += '<button type="button" class="btn btn-info btn-xs tableButton cambiar-color-button-editar" onclick="abrir_modal_editar(\'/perfil_admin/editar_usuario/'+response[i]['pk']+'/\');"><i class="fas fa-edit"></i></button>';
				fila += '</tr>';
				$('#tabla_usuarios tbody').append(fila);
			}
			$('#tabla_usuarios').DataTable({
				//estos son parametros que tiene definido el data table internamente
				language: {
                    "decimal": "",
                    "emptyTable": "No hay información",
                    "info": "Mostrando registros del _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                    "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "loadingRecords": "Cargando...",
                    "processing": "Procesando...",
                    "search": "Buscar:",
                    "zeroRecords": "Sin resultados encontrados",
                    "paginate": {
                        "first": "Primero",
                        "last": "Ultimo",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                },
			});
		},
		error: function(error){
			console.log(error);
		}
	});
}
//funcion para registrar usuario
function registrarUsuario(){
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
			listarUsuarios();
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
//funcion para editar usuario
function editarUsuario(){
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
			listarUsuarios();
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
function eliminarSweetAlertUsuario(pk,nombre){
	Swal.fire({
	  title: 'Estas seguro de eliminar al usuario '+nombre+'?',
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
			url: '/perfil_admin/eliminar_usuario/'+pk+'/',
			type: 'post',
			success: function(response){
				Swal.fire({
				  icon: 'success',
				  title: 'El usuario ha sido eliminado',
				  showConfirmButton: false,
				  timer: 1500
				})
				listarUsuarios();
			},
			error: function(error){
				sweetError(error.responseJSON.mensaje);
			}
		});
	  }
	})
}


//funcion que me permite llamar a la funcion de peticion ajax, en este caso ListarUsuarios
$(document).ready(function(){
	listarUsuarios();
});

//funcion para que cualquier persona pueda registrarse
function registrarUser(){
	// bloquearButton(); es llamado desde main.js
	bloquearButton();
	//
	nombres = $('input[name="nombres"]').val();
	apellidos = $('input[name="apellidos"]').val();

	email = $('input[name="email"]').val();


	nombres = nombres.toLowerCase().replace(/\b[a-z]/g, function(letter) { 
	 
	    return letter.toUpperCase(); 
	 
	});
	var nombresincortar = nombres;
	var nombrecortado = nombresincortar.split(" ");
	var primernombre = nombrecortado[0];

	var data = new FormData($('#form_registrar_user').get(0));
	$.ajax({
	  data: data,
	  //obtenemos la ruta que esta en el action
	  url: $('#form_registrar_user').attr('action'),
	  //obtenemos el tipo de informacion que esta definido en method
	  type: $('#form_registrar_user').attr('method'),
	  cache: false,
	  contentType: false,
	  processData: false,
	  success: function(response){
	    /*Swal.fire({
	      title: 'Un paso más ' + primernombre + '!',
	      html:
	          '<p>Revisa tu bandeja de entrada de tu correo electrónico y haz clic en el enlace de cogua para confirmar tu cuenta.</p>'+'<p style="color:#9e9e9e";>'+email+'</p>',
	      icon: 'info',
	      allowOutsideClick: false,
	      confirmButtonText: `OK`
	    }).then((result) => {
	                if (result.isConfirmed) {
	                  window.location.href = response.url;
	                } else {
	                  window.location.href = response.url;
	                }
	              })*/
	    Swal.fire({
	      title: 'Felicidades ' + primernombre + '!',
	      html:
	          'Ya eres parte de nuestra comunidad.'+
	          '<br><b>Ahora ya puedes realizar tus reservar sin problemas</b>',
	      icon: 'success',
	      allowOutsideClick: false,
	      confirmButtonText: `OK`
	    }).then((result) => {
	                if (result.isConfirmed) {
	                  window.location.href = response.url;
	                } else {
	                  window.location.href = response.url;
	                }
	              })
	  },
	  error: function(error){
		mostrarErroresAgregar(error);
	    //vuelve a desbloquear el button
	    bloquearButton();
	  }
	});
}
//funcion para editar los datos del ussuario que esta autenticado actualmente

function editarUsuarioActual(){
	bloquearButton();
	var data = new FormData($('#form_editar_user_actual').get(0));

	Swal.fire({
	  title: 'Estas seguro?',
	  text: "Tus datos serán actualizados",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#28a745',
	  confirmButtonText: 'Confirmar',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'Cancelar',
	}).then((result) => {
		bloquearButton();
	  if (result.isConfirmed) {
	    $.ajax({
			//el form_editar_user_actual es un id y es llamdo desde el template perfil_ModalEditarUsuario.html
			data: data,
			url: $('#form_editar_user_actual').attr('action'),
			type: $('#form_editar_user_actual').attr('method'),
			cache: false,
			contentType: false,
			processData: false,
			success: function(response){
				cerrar_modal_editar();
				Swal.fire({
			      title: 'Felicidades!',
			      html:
			          'Tus datos han sido actualizados correctamente',
			      icon: 'success',
			      confirmButtonText: `OK`
			    }).then((result) => {
			                if (result.isConfirmed) {
			                  window.location.href = response.url;
			                } else {
			                  window.location.href = response.url;
			                }
			              })
			},
			error: function(error){
				Swal.fire({
					title: 'Lo sentimos!',
					text: 'Sus datos no se han podido actualizar, por favor verifique si los campos han sido ingresados correctamente.',
					icon: 'error'
				});
				mostrarErroresEditar(error);
			}
		});
	  }
	})

	
}
//funcion para editar el apssword del ussuario que esta autenticado actualmente
function editarPasswordUsuarioActual(){
	bloquearButton();
	var data = new FormData($('#form_editar_password_user_actual').get(0));
	$.ajax({
		//el form_editar_password_user_actual es un id y es llamdo desde el template perfil_ModalEditarUsuario.html
		data: data,
		url: $('#form_editar_password_user_actual').attr('action'),
		type: $('#form_editar_password_user_actual').attr('method'),
		cache: false,
		contentType: false,
		processData: false,
		success: function(response){
			Swal.fire({
		      title: 'Felicidades!',
		      html:
		          'Haz actualizado tu contraseña correctamente. ' +
	          '<br><b>Por seguridad, debes iniciar sesión nuevamente con tu nueva contraseña</b>',
		      icon: 'success',
		      confirmButtonText: `OK`
		    }).then((result) => {
		                if (result.isConfirmed) {
		                  window.location.href = response.url;
		                } else {
		                  window.location.href = response.url;
		                }
		              })
		},
		error: function(error){
			mostrarErroresEditar(error);
			bloquearButton();
		}
	});
}

//atajos para la vista de ussuarios
Mousetrap.bind(['alt+d'], function() {
  url = "/perfil_admin/registrar_usuario/"
  abrir_modal_agregar(url)
  return false;
});
Mousetrap.bind(['left'], function() {
  $("#tabla_usuarios_previous").click();
  return false;
});
Mousetrap.bind(['right'], function() {
  $("#tabla_usuarios_next").click();
  return false;
});
Mousetrap.bind(['alt+x'], function() {
  cerrar_modal_agregar()
  return false;
});
Mousetrap.bind(['1'], function() {
  $("#id_nombres").show();
  $("#id_nombres").focus();
  return false;
});
Mousetrap.bind(['2'], function() {
  $("#id_apellidos").show();
  $("#id_apellidos").focus();
  return false;
});
Mousetrap.bind(['3'], function() {
  $("#id_email").show();
  $("#id_email").focus();
  return false;
});
Mousetrap.bind(['4'], function() {
  $("#password1").show();
  $("#password1").focus();
  return false;
});
Mousetrap.bind(['5'], function() {
  $("#password2").show();
  $("#password2").focus();
  return false;
});
Mousetrap.bind(['6'], function() {
  $("#id_imagen").click();
  return false;
});
