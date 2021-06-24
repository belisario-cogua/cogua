$(document).ready(function(){
	listarComentarios();
});
function listarComentarios(){
	var user = $('#temp').attr('data-value');
	var id = parseInt(user);
    var csrftoken = getCookie('csrftoken'); 
    $.ajax({
        //atravez de data enviamos el token es decir el {% csrf_token %}
        data:{
            "id": id,
            csrfmiddlewaretoken: csrftoken
        },
        url: '/home/publicacion/comentarios/',
        type: 'post',
        success: function(response){
            console.log(response.comentario)
            var temp = response.comentario;
            for(let i = 0; i < temp.length;i++){
                let contenedor = '<div style="margin-top:20px;">';
                console.log(temp[i]["comentario"])
                console.log(temp[i]["creado"])
                console.log(temp[i]["usuario"][0]["nombres"])
                console.log(temp[i]["usuario"][0]["apellidos"])
                console.log(temp[i]["usuario"][0]["imagen"])
                created = temp[i]["creado"];
                date = new Date(created);
                dia = date.getDate();
                mes = date.getMonth();
                hora = date.getHours();
                year = date.getFullYear();
                hora = (hora < 10 ? "0" : "") + hora;
                minutos = date.getMinutes();
                minutos = (minutos < 10 ? "0" : "") + minutos;

                var mostrarHora = "";
                if (hora < 12) {
                    if (hora == 1) {
                        mostrarHora = "a la " + hora + ':' + minutos + ' am';
                    }else{
                        mostrarHora = "a las " + hora + ':' + minutos + ' am';
                    }
                }else{
                    if (hora == 13) {
                        mostrarHora = "a la " + hora + ':' + minutos + ' pm';
                    }else{
                        mostrarHora = "a las " + hora + ':' + minutos + ' pm';
                    }
                }

                var meses = [
                              "Enero", "Febrero", "Marzo",
                              "Abril", "Mayo", "Junio", "Julio",
                              "Agosto", "Septiembre", "Octubre",
                              "Noviembre", "Diciembre"
                            ]

                var imagen = ""
                if (temp[i]["usuario"][0]["imagen"] == "") {
                    imagen = "/static/personal/imagen/usuario.png/";
                }else{
                    imagen = '/media/'+temp[i]["usuario"][0]["imagen"]+'/';
                }
                 contenedor += '<div class="comment-list">\n\
                     <div class="single-comment justify-content-between d-flex">\n\
                        <div class="user justify-content-between d-flex">\n\
                           <div class="thumb">\n\
                              <img src="'+ imagen+'" alt="">\n\
                           </div>\n\
                           <div class="desc">\n\
                              <p class="comment">'+temp[i]["comentario"]+'</p>\n\
                              <div class="d-flex justify-content-between">\n\
                                 <div class="d-flex align-items-center">\n\
                                    <h5>\n\
                                       <a href="#">'+temp[i]["usuario"][0]["nombres"]+' '+temp[i]["usuario"][0]["apellidos"]+'</a>\n\
                                    </h5>\n\
                                    <p class="date">'+meses[mes]+' '+dia+', '+year+' '+mostrarHora+'</p>\n\
                                 </div>\n\
                              </div>\n\
                           </div>\n\
                        </div>\n\
                     </div>\n\
                  </div>';

                contenedor += '</div>';
                $('#comentarios').append(contenedor);
            }
        },
        error: function(error){
            sweetError(error.responseJSON.mensaje);
        }
    });
}

function realizarComentario(){
	var comentario = document.getElementById('comment').value;
	var user = $('#temp').attr('data-value');
	var id = parseInt(user);
	var csrftoken = getCookie('csrftoken'); 
	
	$.ajax({
		//el form_agregar es un id y es llamdo desde el template perfil_ModalAgregarUsuario.html
		data: {
			"id":id,
			"comentario": comentario,
            csrfmiddlewaretoken: csrftoken
		},
		//obtenemos la ruta que esta en el action
		url: "/home/agregar_comentario/",
		type: 'post',
		//obtenemos el tipo de informacion que esta definido en method
		success: function(response){
			//el response.mensaje es llamado desde usuarios/views.py cuando retorna response
			console.log(response);
			if(response.mensaje == "True"){
				location.reload();
			}else{
				console.log("no existe el comentario")
			}
			
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