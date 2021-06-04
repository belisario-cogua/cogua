//funciona para listar deportes con peticion ajax
var $ = jQuery.noConflict();
function listarSolicitudesReservas(){
	$.ajax({
		url: "/perfil_admin/listar_solicitudes_reservas/",
		type: "get",
		dataType: "json",
		success: function(response){
			if($.fn.DataTable.isDataTable('#tabla-solicitudes-turismos')){
				$('#tabla-solicitudes-turismos ').DataTable().destroy();
			}
			$('#tabla-solicitudes-turismos tbody').html("");
			for(let i = 0;i < response.length;i++){
				let fila = '<tr>';
				modelo = response[i]["model"];

				var fecha = response[i]["fields"]['created'];
				fechaReserva = new Date(fecha);
				var day = fechaReserva.getDate();
				var month = fechaReserva.getMonth();
				var year = fechaReserva.getFullYear();
				var meses = [
							  "Enero", "Febrero", "Marzo",
							  "Abril", "Mayo", "Junio", "Julio",
							  "Agosto", "Septiembre", "Octubre",
							  "Noviembre", "Diciembre"
							]
				var dias = ["Domingo","Lunes", "Martes", "Miercoles","Jueves", "Viernes", "Sábado"];
				created  = 'El ' + dias[fechaReserva.getDay()]+' '+ day + ' de ' +  meses[month] + ' del ' + year;

				var usuario = response[i]["fields"]['usuario'];
				usuario = usuario.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) { 
				    return letter.toUpperCase(); 
				});

				function MaysPrimera(string){
				  return string.charAt(0).toUpperCase() + string.slice(1);
				}

				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + (i+1) + '</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + usuario + '</a></td>';
				if (modelo == "reservas.reservadeporte") {
					deporte = response[i]["fields"]['deporte'];
					deporte = MaysPrimera(deporte.toLowerCase());
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Deporte</a></td>';
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + deporte +'</a></td>';
				}
				else if (modelo == "reservas.reservaturismo") {
					turismo = response[i]["fields"]['turismo'];
					turismo = MaysPrimera(turismo.toLowerCase());
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Lugar Turístico</a></td>';
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + turismo +'</a></td>';					
				}
				else if (modelo == "reservas.reservaplato") {
					plato = response[i]["fields"]['plato'];
					plato = MaysPrimera(plato.toLowerCase());
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Plato Típico</a></td>';
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + plato +'</a></td>';
				}
				else if (modelo == "reservas.reservahotel") {
					hotel = response[i]["fields"]['hotel'];
					hotel = MaysPrimera(hotel.toLowerCase());
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Cabaña</a></td>';
					fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + hotel +'</a></td>';
				}
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + created +'</a></td>';
				fila += '<td class="text-center fila-table">';
				if (response[i]["fields"]['confirmar'] == false) {
					fila += '<button type="button" class="btn btn-xs tableButton" onclick="confirmarReservaDeporte(\''+response[i]['pk']+'\',\''+usuario+'\',\''+modelo+'\');">';
					fila += '<img src="/static/personal/icons/espera.png" style="width:25px;height:25px;float:right;"/></button>';
				}else{
					fila += '<button type="button" class="btn btn-xs tableButton" onclick="cancelarReservaDeporte(\''+response[i]['pk']+'\',\''+usuario+'\',\''+modelo+'\');">';
					fila += '<img src="/static/personal/icons/comprobar.png" style="width:25px;height:25px;float:right;"/></button></td>';
				}
				console.log(modelo)
				$('#tabla-solicitudes-turismos tbody').append(fila);
			}
			$('#tabla-solicitudes-turismos').DataTable({
				//estos son parametros que tiene definido el data table internamente
				language: {
		          decimal: "",
		          emptyTable: "No existen solicitudes",
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
//funcion que me permite llamar a la funcion de peticion ajax, en este caso ListarUsuarios
$(document).ready(function(){
	listarSolicitudesReservas();
});


function confirmarReservaDeporte(pk,usuario,modelo){
	var nombre;
	if (modelo == "reservas.reservadeporte") {
		nombre = "deporte";
	}else if (modelo == "reservas.reservaturismo") {
		nombre = "turismo";
	}else if (modelo == "reservas.reservaplato") {
		nombre = "plato";
	}else if (modelo == "reservas.reservahotel") {
		nombre = "hotel";
	}
	Swal.fire({
	  title: 'Confirmar la visita de\n' + usuario,
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#28a745',
	  confirmButtonText: 'Aceptar',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'Cancelar',
	}).then((result) => {
	  if (result.isConfirmed) {
	    //declaramos la variable csrfftoken con la funcion getCookie
		var csrftoken = getCookie('csrftoken'); 
		$.ajax({
			//atravez de data enviamos el token es decir el {% csrf_token %}
			data:{
				'reserva': pk,
				'modelo': nombre,
				'opcion': "confirmar",
				csrfmiddlewaretoken: csrftoken
			},
			url: '/perfil_admin/confirmar_reserva_deporte/',
			type: 'post',
			success: function(response){
				Swal.fire({
				  icon: 'success',
				  title: 'La visita de '+usuario+' ha sido confirmado',
				  showConfirmButton: false,
				  timer: 1500
				})
				listarSolicitudesReservas();
			},
			error: function(error){
				sweetError(error.responseJSON.mensaje);
			}
		});
	  }
	})
}

function cancelarReservaDeporte(pk,usuario,modelo){
	var nombre;
	if (modelo == "reservas.reservadeporte") {
		nombre = "deporte";
	}else if (modelo == "reservas.reservaturismo") {
		nombre = "turismo";
	}else if (modelo == "reservas.reservaplato") {
		nombre = "plato";
	}else if (modelo == "reservas.reservahotel") {
		nombre = "hotel";
	}
	Swal.fire({
	  title: 'Cancelar la visita de\n' + usuario,
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#28a745',
	  confirmButtonText: 'Si',
	  cancelButtonColor: '#d33',
	  cancelButtonText: 'No',
	}).then((result) => {
	  if (result.isConfirmed) {
	    //declaramos la variable csrfftoken con la funcion getCookie
		var csrftoken = getCookie('csrftoken'); 
		$.ajax({
			//atravez de data enviamos el token es decir el {% csrf_token %}
			data:{
				'reserva': pk,
				'modelo': nombre,
				'opcion': "cancelar",
				csrfmiddlewaretoken: csrftoken
			},
			url: '/perfil_admin/confirmar_reserva_deporte/',
			type: 'post',
			success: function(response){
				Swal.fire({
				  icon: 'success',
				  title: 'La visita de '+ usuario +' ha sido cancelada',
				  showConfirmButton: false,
				  timer: 1500
				})
				listarSolicitudesReservas();
			},
			error: function(error){
				sweetError(error.responseJSON.mensaje);
			}
		});
	  }
	})
}