//funciona para listar deportes con peticion ajax
var $ = jQuery.noConflict();
function listarReservasHoteles(){
	$.ajax({
		url: "/perfil_admin/listar_reservas_hoteles/",
		type: "get",
		dataType: "json",
		success: function(response){
			if($.fn.DataTable.isDataTable('#tabla_reservas_hoteles')){
				$('#tabla_reservas_hoteles ').DataTable().destroy();
			}
			$('#tabla_reservas_hoteles tbody').html("");
			for(let i = 0;i < response.length;i++){
				let fila = '<tr>';

				var fecha = response[i]["fields"]['fecha_inicial'];

				var usuario = response[i]["fields"]['usuario'];
				usuario = usuario.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) { 
				    return letter.toUpperCase(); 
				});

				function MaysPrimera(string){
				  return string.charAt(0).toUpperCase() + string.slice(1);
				}
				hotel = response[i]["fields"]['hotel'];
				hotel = MaysPrimera(hotel.toLowerCase());

				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">' + (i+1) + '</a></td>';
				if (response[i]["fields"]['activado'] == false) {
					fila += '<td class="fila-table"><a href="#" class="link" style="background:#a30707; color:#fff;border-radius:3px;padding-left:5px;padding-right:5px" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">Caducado</a></td>';
				}else if (response[i]["fields"]['activado'] == true){
					if (response[i]["fields"]['confirmar'] == true) {
						fila += '<td class="fila-table"><a href="#" class="link" style="background:#00A40E; color:#fff;border-radius:3px;padding-left:5px;padding-right:5px" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">Aceptado</a></td>';
					}else{
						fila += '<td class="fila-table"><a href="#" class="link" style="background:#d47108; color:#fff;border-radius:3px;padding-left:5px;padding-right:5px" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">Cancelado</a></td>';
					}
				}
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">' + usuario +'</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">' + hotel +'</a></td>';
				fila += '<td class="fila-table"><a href="#" class="link" onclick="abrir_modal_detalles(\'/perfil_admin/reserva_detalles_hotel/'+response[i]['pk']+'/\');">' + fechaInicial(fecha) +'</a></td>';
				fila += '<td class="text-center fila-table"><button type="button" class="btn btn-danger btn-xs tableButton cambiar-color-button-eliminar" onclick="eliminarSweetAlertReservaHotel(\''+response[i]['pk']+'\',\''+usuario+'\',\''+hotel+'\');"><i class="fas fa-trash"></i></button></td>';
				fila += '</tr>';
				$('#tabla_reservas_hoteles tbody').append(fila);
			}
			$('#tabla_reservas_hoteles').DataTable({
				//estos son parametros que tiene definido el data table internamente
				language: {
		          decimal: "",
		          emptyTable: "No hay información",
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
	listarReservasHoteles();
});
//funcion para eliminar la reserva del hotel por user admin
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
	var ayer=new Date(today.getTime() - 24*60*60*1000);
	var ayerTmp = ayer.getFullYear()+'-'+ayer.getMonth()+'-'+ayer.getDate();
	var reserva = year+'-'+month+'-'+day;

	if (ayerTmp == reserva) {
		inicio  = 'Ayer, ' + dias[fechaReserva.getDay()]+' '+ day + ' de ' +  meses[month] + ' del ' + year;
	}else{
		inicio  = 'El ' + dias[fechaReserva.getDay()]+' '+ day + ' de ' +  meses[month] + ' del ' + year;
	}
	
	return inicio;
}
function eliminarSweetAlertReservaHotel(pk,cliente,hotel){
	Swal.fire({
	  title: 'Estas seguro de eliminar esta reserva?',
	  html:
            'Cliente: ' +
            '<b>'+cliente+'</b><br>'+
            'Cabaña: ' +
            '<b>'+hotel+'</b><br>',
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
			url: '/perfil_admin/eliminar_reserva_hotel/'+pk+'/',
			type: 'post',
			success: function(response){
				Swal.fire({
				  icon: 'success',
				  title: 'El registro ha sido eliminado',
				  showConfirmButton: false,
				  timer: 1500
				})
				listarReservasHoteles();
			},
			error: function(error){
				sweetError(error.responseJSON.mensaje);
			}
		});
	  }
	})
}

