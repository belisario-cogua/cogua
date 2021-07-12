perfil_user = document.getElementById("perfil_user");
editar_home = document.getElementById("editar_home");
btn_editar_perfil = document.getElementById("btn_editar_perfil");
btn_regresar = document.getElementById("btn_regresar");

btn_editar_perfil1 = document.getElementById("btn_editar_perfil1");
btn_regresar1 = document.getElementById("btn_regresar1");

function editarHome(){

	perfil_user.style.display = "none";
	btn_editar_perfil.style.display = "none";
	editar_home.style.display = "block";
	btn_regresar.style.display = "block";

	btn_editar_perfil1.style.display = "none";
	btn_regresar1.style.display = "block";
	listarImagenesHome();

}
function regresarPerfil(){
	perfil_user.style.display = "block";
	btn_editar_perfil.style.display = "block";
	editar_home.style.display = "none";
	btn_regresar.style.display = "none";

	btn_editar_perfil1.style.display = "block";
	btn_regresar1.style.display = "none";
}

function listarImagenesHome(){
	var contenedor = document.getElementById('contenedor_carga');
	contenedor.style.visibility = 'visible';
	contenedor.style.opacity = '1';
	$.ajax({
		url: "/perfil/listar_imagenes/home/",
		type: "get",
		dataType: "json",
		success: function(response){
			
			$('#contenedore-fotos-home').empty();
			$('#contenedore-fotos-hoteles').empty();
			$('#contenedore-fotos-deportes').empty();
			$('#contenedore-fotos-lugares').empty();
			$('#contenedore-fotos-platos').empty();
			$('#contenedore-fotos-logo').empty();

			for(let i=0; i < response.length; i++){

				tipo = response[i]["fields"]["nombre"]
				let contenedor = '<div>';
				if (tipo == "home") {
					contenedor += '<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="{{ user.nombres }} {{ user.apellidos }}" style="position:relative;">\n\
                        <div class="custom-file" style="cursor: pointer;">\n\
                          <a onclick="abrir_modal_editar(\'/perfil/editar_imagen_home/'+response[i]['pk']+'/\');" \n\
                          class="btn-editar-imagen">Actualizar \n\
                          <i class="fas fa-pen" style="color: #FF9F00; font-size: 12px;"></i></a>\n\
                        </div>'
					contenedor += '</div>';
					$('#contenedore-fotos-home').append(contenedor);

				}else if (tipo == "cabaña") {
					contenedor += '<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="{{ user.nombres }} {{ user.apellidos }}" style="position:relative;">\n\
                        <div class="custom-file" style="cursor: pointer;">\n\
                          <a onclick="abrir_modal_editar(\'/perfil/editar_imagen_home/'+response[i]['pk']+'/\');" \n\
                          class="btn-editar-imagen">Actualizar \n\
                          <i class="fas fa-pen" style="color: #FF9F00; font-size: 12px;"></i></a>\n\
                        </div>'
					contenedor += '</div>';
					$('#contenedore-fotos-hoteles').append(contenedor);

				}else if (tipo == "deporte") {
					contenedor += '<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="{{ user.nombres }} {{ user.apellidos }}" style="position:relative;">\n\
                        <div class="custom-file" style="cursor: pointer;">\n\
                          <a onclick="abrir_modal_editar(\'/perfil/editar_imagen_home/'+response[i]['pk']+'/\');" \n\
                          class="btn-editar-imagen">Actualizar \n\
                          <i class="fas fa-pen" style="color: #FF9F00; font-size: 12px;"></i></a>\n\
                        </div>'
					contenedor += '</div>';
					$('#contenedore-fotos-deportes').append(contenedor);

				}else if (tipo == "lugar") {
					contenedor += '<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="{{ user.nombres }} {{ user.apellidos }}" style="position:relative;">\n\
                        <div class="custom-file" style="cursor: pointer;">\n\
                          <a onclick="abrir_modal_editar(\'/perfil/editar_imagen_home/'+response[i]['pk']+'/\');" \n\
                          class="btn-editar-imagen">Actualizar \n\
                          <i class="fas fa-pen" style="color: #FF9F00; font-size: 12px;"></i></a>\n\
                        </div>'
					contenedor += '</div>';
					$('#contenedore-fotos-lugares').append(contenedor);

				}else if (tipo == "plato") {
					contenedor += '<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="{{ user.nombres }} {{ user.apellidos }}" style="position:relative;">\n\
                        <div class="custom-file" style="cursor: pointer;">\n\
                          <a onclick="abrir_modal_editar(\'/perfil/editar_imagen_home/'+response[i]['pk']+'/\');" \n\
                          class="btn-editar-imagen">Actualizar \n\
                          <i class="fas fa-pen" style="color: #FF9F00; font-size: 12px;"></i></a>\n\
                        </div>'
					contenedor += '</div>';
					$('#contenedore-fotos-platos').append(contenedor);

				}else if (tipo == "logo") {
					contenedor += '<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="{{ user.nombres }} {{ user.apellidos }}" style="position:relative;">\n\
                        <div class="custom-file" style="cursor: pointer;">\n\
                          <a onclick="abrir_modal_editar(\'/perfil/editar_imagen_home/'+response[i]['pk']+'/\');" \n\
                          class="btn-editar-imagen">Actualizar \n\
                          <i class="fas fa-pen" style="color: #FF9F00; font-size: 12px;"></i></a>\n\
                        </div>'
					contenedor += '</div>';
					$('#contenedore-fotos-logo').append(contenedor);
				}
				
			}
			contenedor.style.visibility = 'hidden';
        	contenedor.style.opacity = '0';
		},
		error: function(error){
			console.log(error);
		}
	});
}
function editarImagenHome(){
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
			listarImagenesHome();
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
$(document).on('change','#id_imagen',function(){
	if(this.files && this.files[0]){
		$('#mostrar-imagen-temp').empty();
		id_imagen = document.getElementById("quitar-imagen-temp");
		id_imagen.style.display = "none";
    /* Creamos la Imagen*/
		var img = $('<img >');
    /* Asignamos el atributo source , haciendo uso del método createObjectURL*/
		img.attr('src', URL.createObjectURL(this.files[0]));
    /* Añadimos al Div*/
	  $('#mostrar-imagen-temp').append(img);
	}
});