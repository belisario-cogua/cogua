//funciona para listar deportes con peticion ajax
var $ = jQuery.noConflict();
function listarSolicitudesReservas(){
	$.ajax({
		url: "/perfil_admin/listar_solicitudes_reservas/",
		type: "get",
		dataType: "json",
		success: function(response){
			var temp = response.length;
			var total = document.getElementById('total');
			if (temp > 0) {
				total.innerHTML = temp;
				
				$('.total').show();
				$('.container-solicitudes').show();
				
			}else{
				$('.t-total').hide();
			}

			if($.fn.DataTable.isDataTable('#tabla-solicitudes-turismos')){
				$('#tabla-solicitudes-turismos ').DataTable().destroy();
			}
			$('#tabla-solicitudes-turismos tbody').html("");
			var numSinConfirmar = 0;
			var numAceptado = 0;
			var numCancelado = 0;
			
			for(let i = 0;i < response.length;i++){
				if (response[i]["fields"]["activado"]==false) {
					numSinConfirmar = numSinConfirmar + 1;
				}
				if (response[i]["fields"]["activado"]==true && response[i]["fields"]["confirmar"]==true) {
					numAceptado = numAceptado + 1;
				}
				if (response[i]["fields"]["activado"]==true && response[i]["fields"]["confirmar"]==false) {
					numCancelado = numCancelado + 1;
				}
				

				let fila = '<tr>';
				modelo = response[i]["model"];

				var fecha = response[i]["fields"]['fecha_inicial'];
				
				var usuario = response[i]["fields"]['usuario'];
				usuario = usuario.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) { 
				    return letter.toUpperCase(); 
				});

				function MaysPrimera(string){
				  return string.charAt(0).toUpperCase() + string.slice(1);
				}

				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + (i+1) + '</a></td>';
				if (response[i]["fields"]['activado'] == false) {
					fila += '<td class="fila-table"><a href="#" class="link" style="background:#a30707; color:#fff;border-radius:3px;padding-left:5px;padding-right:5px" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Sin confirmar</a></td>';
				}else if (response[i]["fields"]['activado'] == true){
					if (response[i]["fields"]['confirmar'] == true) {
						fila += '<td class="fila-table"><a href="#" class="link" style="background:#00A40E; color:#fff;border-radius:3px;padding-left:5px;padding-right:5px" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Aceptado</a></td>';
					}else{
						fila += '<td class="fila-table"><a href="#" class="link" style="background:#d47108; color:#fff;border-radius:3px;padding-left:5px;padding-right:5px" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">Cancelado</a></td>';
					}
				}
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
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_deporte/'+response[i]['pk']+'/\');">' + fechaInicial(fecha) +'</a></td>';
				fila += '<td class="text-center fila-table">';
				if (response[i]["fields"]['confirmar'] == false) {
					fila += '<button type="button" style="border-radius:50%" class="btn btn-info btn-xs tableButton cambiar-color-button-editar" onclick="confirmarReservaDeporte(\''+response[i]['pk']+'\',\''+usuario+'\',\''+modelo+'\');">';
					fila += '<i class="fas fa-user-clock"></i></button>';
				}else{
					fila += '<button type="button" class="btn btn-xs tableButton" onclick="cancelarReservaDeporte(\''+response[i]['pk']+'\',\''+usuario+'\',\''+modelo+'\');">';
					fila += '<img src="/static/personal/icons/comprobar.png" style="width:25px;height:25px;float:right;"/></button></td>';
				}
				$('#tabla-solicitudes-turismos tbody').append(fila);
			}

			var sin_confirmar = document.getElementById('t-sin-confirmar-num');
			var aceptado = document.getElementById('t-aceptados-num');
			var cancelado = document.getElementById('t-cancelados-num');

			if (numSinConfirmar > 0) {
				sin_confirmar.innerHTML = numSinConfirmar;
				$('.t-sin-confirmar').show();
			}
			else{
				$('.t-sin-confirmar').hide();
			}

			if (numAceptado > 0) {
				aceptado.innerHTML = numAceptado;
				$('.t-aceptados').show();

			}else{
				$('.t-aceptados').hide();
			}

			if (numCancelado > 0) {
				cancelado.innerHTML = numCancelado;
				$('.t-cancelados').show();

			}else{
				$('.t-cancelados').hide();
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

function fechaInicial(fecha){
	fechaReserva = new Date(fecha.replace(/-/g, '\/'));
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

	today = new Date()
	mesActual = "";
	diaActual = "";
	inicio = "";
	if ((today.getMonth()+1)<10) {
		mesActual = '0'+(today.getMonth()+1);
	}else{
		mesActual = (today.getMonth()+1);
	}
	if ((today.getDate())<10) {
		diaActual = '0'+today.getDate();
	}else{
		diaActual = today.getDate();
	}
	hoy = today.getFullYear()+'-'+mesActual+'-'+diaActual;
	if (hoy == fecha) {
		inicio  = 'Hoy, ' + dias[fechaReserva.getDay()]+' '+ day + ' de ' +  meses[month] + ' del ' + year;
	}else{
		inicio  = 'El ' + dias[fechaReserva.getDay()]+' '+ day + ' de ' +  meses[month] + ' del ' + year;
	}
	return inicio;
}
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
			url: '/perfil_admin/confirmar_reserva/',
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
			url: '/perfil_admin/confirmar_reserva/',
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
