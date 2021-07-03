var $ = jQuery.noConflict();
//configuraciones realizadas
$(document).ready(function(){
	var notifica = $('#notificacion').attr('data-value');
	var soli = $('#solicitud').attr('data-value');
	if (notifica > 0) {
		$('.notification-counter').show();
	}
	if (soli > 0) {
		$('.solicitud-counter').show();
	}
	$.ajax({
			url: "/perfil/notificaciones/",
			type: "get",
			dataType: "json",
			success: function(response){
				$('#container-notificaiones').empty();
				numresponse = response.length
				if (numresponse == 0) {
					let contenedor = '<div>';
					contenedor += '<div>\n\
					<div class="dropdown-divider divide"></div>';
					contenedor += '<a class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b;">\n\
					<p style="margin-left:60px;"> No tienes notificaciones';
					contenedor += '</div>';
					$('#container-notificaiones').append(contenedor);
				}else{
					for(let i = 0;i < response.length;i++){
						let contenedor = '<div>';
						//la varibale tiempo es enviada a la funcion obtenerTiempo(tiempo)
						var tiempo = response[i]["fields"]["created"];
						if (response[i]["fields"]["tipo"] == "comentario") {
							contenedor += '<div>\n\
							<div class="dropdown-divider divide"></div>';
							contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #b5fab4; height: 115px;">\n\
							<p><span class="usuario-notificado">'+response[i]["fields"]["actor"]+'</span> a comentado\n\
			                "'+response[i]["fields"]["comentario"]+'"';
			                contenedor += '</p><p><span class="reserva-confirmado">Publicación: </span>';
				            
			                contenedor += response[i]["fields"]["publicacion"] + '</p>';
							contenedor += obtenerTiempo(tiempo);
							contenedor += '</p></a>\n\
							</div>';
							contenedor += '</div>';
							$('#container-notificaiones').append(contenedor);

						}else if(response[i]["fields"]["tipo"] == "solicitud") {
							contenedor += '<div>\n\
							<div class="dropdown-divider divide"></div>';
							if (response[i]["fields"]["solicitud"]=='Reserva hotel aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_hotel"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva hotel cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_hotel"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}
							if (response[i]["fields"]["solicitud"]=='Reserva deporte aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_deporte"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva deporte cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_deporte"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}
							if (response[i]["fields"]["solicitud"]=='Reserva plato aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_plato"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva plato cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_plato"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}
							if (response[i]["fields"]["solicitud"]=='Reserva turismo aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_turismo"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva turismo cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_turismo"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}

				            
			                
			                contenedor += obtenerTiempo(tiempo);
			                contenedor += '</p></a>\n\
							</div>';
							contenedor += '</div>';
							$('#container-notificaiones').append(contenedor);
					        
							
							
						
						}else if(response[i]["fields"]["tipo"] == "caducar"){

							if (response[i]["fields"]["enviado"] == true && response[i]["fields"]["notificacion_num"] == 0) {
								contenedor += '<div>\n\
								<div class="dropdown-divider divide"></div>';
								if (response[i]["fields"]["solicitud"] == "reserva hotel") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_hotel"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Cabaña</p>';
								
								}else if (response[i]["fields"]["solicitud"] == "reserva deporte") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_deporte"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Deporte</p>';
								
								}else if (response[i]["fields"]["solicitud"] == "reserva plato") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_plato"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Plato Típico</p>';
								
								}else if (response[i]["fields"]["solicitud"] == "reserva turismo") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_turismo"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Lugar Turístico</p>';
								
								}
								contenedor += obtenerTiempo(tiempo);
								contenedor += '</p></a>\n\
								</div>';
								contenedor += '</div>';
								$('#container-notificaiones').append(contenedor);
							}
							
						}					
						
						

			            
					

					}
				}
				
			},
			error: function(error){
				console.log(error);
			}
		});
	
		
	//para mostrar el numero de solicituedes en el menu
	$.ajax({
		url: "/perfil/solicitudes_reservas_admin/",
		type: "get",
		dataType: "json",
		success: function(response){
			for (let i = 0; i < response.length; i++) {
				var temp = response[i]["fields"]['solicitud'];
				var solicitud = document.getElementById('solicitud');
				if (temp > 0) {
					solicitud.innerHTML = temp;
					$('.solicitud-counter').show();
				}else{
					$('.solicitud-counter').hide();
				}
			}
		},
		error: function(error){
			console.log(error);
		}
	});
	//para mostrar el numero de notificaciones de confirmacion de reserva en el icon campana
	$.ajax({
		url: "/perfil/notificacion_confirm_reserva/",
		type: "get",
		dataType: "json",
		success: function(response){
			for (let i = 0; i < response.length; i++) {
				var temp = response[i]["fields"]['notificacion'];
				var notificacion = document.getElementById('notificacion');
				if (temp > 0) {
					notificacion.innerHTML = temp;
					$('.notification-counter').show();
				}else{
					$('.notification-counter').hide();
				}
				
			}
		},
		error: function(error){
			console.log(error);
		}
	});

	setInterval(function(){
	$.ajax({
			url: "/perfil/notificaciones/",
			type: "get",
			dataType: "json",
			success: function(response){
				$('#container-notificaiones').empty();
				numresponse = response.length
				if (numresponse == 0) {
					let contenedor = '<div>';
					contenedor += '<div>\n\
					<div class="dropdown-divider divide"></div>';
					contenedor += '<a class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b;">\n\
					<p style="margin-left:60px;"> No tienes notificaciones';
					contenedor += '</div>';
					$('#container-notificaiones').append(contenedor);
				}else{
					for(let i = 0;i < response.length;i++){
						let contenedor = '<div>';
						//la varibale tiempo es enviada a la funcion obtenerTiempo(tiempo)
						var tiempo = response[i]["fields"]["created"];
						if (response[i]["fields"]["tipo"] == "comentario") {
							contenedor += '<div>\n\
							<div class="dropdown-divider divide"></div>';
							contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #b5fab4; height: 115px;">\n\
							<p><span class="usuario-notificado">'+response[i]["fields"]["actor"]+'</span> a comentado\n\
			                "'+response[i]["fields"]["comentario"]+'"';
			                contenedor += '</p><p><span class="reserva-confirmado">Publicación: </span>';
				            
			                contenedor += response[i]["fields"]["publicacion"] + '</p>';
							contenedor += obtenerTiempo(tiempo);
							contenedor += '</p></a>\n\
							</div>';
							contenedor += '</div>';
							$('#container-notificaiones').append(contenedor);

						}else if(response[i]["fields"]["tipo"] == "solicitud") {
							contenedor += '<div>\n\
							<div class="dropdown-divider divide"></div>';
							if (response[i]["fields"]["solicitud"]=='Reserva hotel aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_hotel"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva hotel cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_hotel"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}
							if (response[i]["fields"]["solicitud"]=='Reserva deporte aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_deporte"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva deporte cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_deporte"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}
							if (response[i]["fields"]["solicitud"]=='Reserva plato aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_plato"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva plato cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_plato"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}
							if (response[i]["fields"]["solicitud"]=='Reserva turismo aceptado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #def4ff; height: 115px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> te agradecemos por preferirnos\n\
				                esperamos disfrutes de tu viaje con nosotros.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva confirmado: </span>';
				                contenedor += response[i]["fields"]["reserva_turismo"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}else if (response[i]["fields"]["solicitud"]=='Reserva turismo cancelado') {
								contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede;height: 100px;">\n\
								<p><span class="usuario-notificado">'+response[i]["fields"]["destinatario"]+'</span> tu reserva ha sido cancelada\n\
				                te esperamos para la proxima.';
				                contenedor += '</p><p><span class="reserva-confirmado">Reserva: </span>';
				                contenedor += response[i]["fields"]["reserva_turismo"] + '</p>\n\
				                <p><span class="aceptado-por">Por\n\
				                <span class="aceptado-de">'+response[i]["fields"]["actor"]+'</span></span>';
							}

				            
			                
			                contenedor += obtenerTiempo(tiempo);
			                contenedor += '</p></a>\n\
							</div>';
							contenedor += '</div>';
							$('#container-notificaiones').append(contenedor);
					        
							
							
						
						}else if(response[i]["fields"]["tipo"] == "caducar"){

							if (response[i]["fields"]["enviado"] == true && response[i]["fields"]["notificacion_num"] == 0) {
								contenedor += '<div>\n\
								<div class="dropdown-divider divide"></div>';
								if (response[i]["fields"]["solicitud"] == "reserva hotel") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_hotel"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Cabaña</p>';
								
								}else if (response[i]["fields"]["solicitud"] == "reserva deporte") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_deporte"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Deporte</p>';
								
								}else if (response[i]["fields"]["solicitud"] == "reserva plato") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_plato"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Plato Típico</p>';
								
								}else if (response[i]["fields"]["solicitud"] == "reserva turismo") {
									contenedor += '<a href="#" class="dropdown-item" data-widget="fullscreen" class="notificacion-informacion color-notificacion" style="font-size: 13px; color: #5c5b5b; background-color: #fadede; height: 115px;">\n\
									<p><span class="usuario-notificado">Tu reserva "'+response[i]["fields"]["reserva_turismo"]+'"';
									contenedor += '</span> a caducado\n\
					                te esperamos para la próxima.';
					                contenedor += '</p><p><span class="reserva-confirmado">Tipo reserva: </span>';
					                contenedor += 'Lugar Turístico</p>';
								
								}
								contenedor += obtenerTiempo(tiempo);
								contenedor += '</p></a>\n\
								</div>';
								contenedor += '</div>';
								$('#container-notificaiones').append(contenedor);
							}
							
						}					
						
						

			            
					

					}
				}
				
			},
			error: function(error){
				console.log(error);
			}
		});
	
		
		//para mostrar el numero de solicituedes en el menu
		$.ajax({
			url: "/perfil/solicitudes_reservas_admin/",
			type: "get",
			dataType: "json",
			success: function(response){
				for (let i = 0; i < response.length; i++) {
					var temp = response[i]["fields"]['solicitud'];
					var solicitud = document.getElementById('solicitud');
					if (temp > 0) {
						solicitud.innerHTML = temp;
						$('.solicitud-counter').show();
					}else{
						$('.solicitud-counter').hide();
					}
				}
			},
			error: function(error){
				console.log(error);
			}
		});
		//para mostrar el numero de notificaciones de confirmacion de reserva en el icon campana
		$.ajax({
			url: "/perfil/notificacion_confirm_reserva/",
			type: "get",
			dataType: "json",
			success: function(response){
				for (let i = 0; i < response.length; i++) {
					var temp = response[i]["fields"]['notificacion'];
					var notificacion = document.getElementById('notificacion');
					if (temp > 0) {
						notificacion.innerHTML = temp;
						$('.notification-counter').show();
					}else{
						$('.notification-counter').hide();
					}
					
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	}, 6000);
});
function obtenerTiempo(tiempo){
	n1 =  new Date(tiempo);
	n =  new Date();
	var diffMs = (n - n1);
	//para validaciones
	var segundos1 = (diffMs / 1000).toFixed(1);
    var minutes = (diffMs / (1000 * 60)).toFixed(1);
    var hours = (diffMs / (1000 * 60 * 60)).toFixed(1);
    var days = (diffMs / (1000 * 60 * 60 * 24)).toFixed(1);
    var meses1 = (diffMs / (1000 * 60 * 60 * 24 * 30.416666666666668)).toFixed(1);
    var years1 = (diffMs / (1000 * 60 * 60 * 24 * 30.416666666666668 * 12)).toFixed(1);

    //para los calculos
    var created = new Date(tiempo)
	var hoy = new Date()

	var tiempoPasado1= hoy - created
	var segs = 1000;
	var mins = segs * 60;
	var hours1 = mins * 60;
	var days1 = hours1 * 24;
	var months = days1 * 30.416666666666668;
	var years = months * 12;

	//calculo 
	var year = Math.floor(tiempoPasado1 / years);

	tiempoPasado = tiempoPasado1 - (year * years);
	var meses = Math.floor(tiempoPasado / months)

	tiempoPasado = tiempoPasado1 - (meses * months);
	var dias = Math.floor(tiempoPasado / days1)

	tiempoPasado = tiempoPasado1 - (dias * days1);
	var horas = Math.floor(tiempoPasado / hours1)

	tiempoPasado = tiempoPasado1 - (horas * hours1);
	var minutos = Math.floor(tiempoPasado / mins)

	tiempoPasado = tiempoPasado1 - (minutos * mins);
	var segundos = Math.floor(tiempoPasado / segs)

	var contenedor = "";
	if (segundos1 < 60) {
    	contenedor = '<span class="hora-notificacion">hace '+segundos+' segundos</span>';
    }
    else if (minutes < 60) {
    	if (minutos > 1) {
    		contenedor = '<span class="hora-notificacion">hace '+minutos+' minutos</span>';
    	}else{
    		contenedor = '<span class="hora-notificacion">hace '+minutos+' minuto</span>';
    	}
        
    }
    else if (hours < 24) {
    	if(horas > 1){
    		contenedor = '<span class="hora-notificacion">hace '+horas+' horas</span>';
    	}else{
    		contenedor = '<span class="hora-notificacion">hace '+horas+' hora</span>';
    	}
        
    }
    else if (days < 30) {
    	if(dias > 1){
    		contenedor = '<span class="hora-notificacion">hace '+dias+' días</span>';
    	}else{
    		contenedor = '<span class="hora-notificacion">hace '+dias+' día</span>';
    	}
        
    }
    else if(meses1 < 30.416666666666668){
    	if (meses == 1) {
    		if(year > 1){
        		contenedor = '<span class="hora-notificacion">hace '+year+' años</span>';
        	}else{
    			contenedor = '<span class="hora-notificacion">hace '+meses+' mes</span>';
    		}
    		
    	}else if(meses > 1 && meses < 12){
    		if (year > 0) {
    			if (year == 1) {
    				contenedor = '<span class="hora-notificacion">hace '+year+' año</span>';
    			}	
    		}else{
    		contenedor = '<span class="hora-notificacion">hace '+meses+' meses</span>';
    		}

    	}else if (year == 1) {
			contenedor = '<span class="hora-notificacion">hace '+year+' año</span>';
		}else if (year > 1) {
			contenedor = '<span class="hora-notificacion">hace '+year+' años</span>';
		}
        
    }else if(year >= 2){
		contenedor = '<span class="hora-notificacion">hace '+year+' años</span>';
	}

	return contenedor
}
function notificacion_reducir_cero(){
	var csrftoken = getCookie('csrftoken'); 
	$.ajax({
		//atravez de data enviamos el token es decir el {% csrf_token %}
		data:{
			"cero": "cero",
			csrfmiddlewaretoken: csrftoken
		},
		url: '/perfil/notificacion_confirm_cero/',
		type: 'post',
		success: function(response){
			//response d enotificacion reducido
		},
		error: function(error){
			sweetError(error.responseJSON.mensaje);
		}
	});
}
function solicitud_reducir_cero(){
	var csrftoken = getCookie('csrftoken'); 
	$.ajax({
		//atravez de data enviamos el token es decir el {% csrf_token %}
		data:{
			"cero": "cero",
			csrfmiddlewaretoken: csrftoken
		},
		url: '/perfil/solicitud_confirm_cero/',
		type: 'post',
		success: function(response){
			console.log("solicitud reducido")
		},
		error: function(error){
			sweetError(error.responseJSON.mensaje);
		}
	});
}