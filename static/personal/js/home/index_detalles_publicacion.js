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
            var temp = response.comentario;
            var count = 0;
            for(let i = 0; i < temp.length;i++){
            	count = count + 1;
                let contenedor = '<div style="margin-top:20px;">';
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
                           <div class="comentario-imagen-usuario">\n\
                              <img src="'+ imagen+'" alt="">\n\
                           </div>\n\
                           <div class="desc" style="padding-left:20px;">\n\
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
            var mens = document.getElementById('n_comentarios');
            var mens2 = document.getElementById('n_comentarios2');
            count = (count < 10 && count > 0 ? "0" : "") + count;
            total = "";
            total1 = "";
            if(count == 1){
            	total = count + ' comentario';
              total1 = '<i class="fas fa-comments"></i>'+count + ' comentario';
            }else{
            	total = count + ' comentarios';
              total1 = '<i class="fas fa-comments"></i>'+count + ' comentario';
            }
			mens.innerHTML=total;
			mens2.innerHTML=total1;
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
	if (comentario == "") {
    var $input = $("#mensaje-sin_comentario");
    $input.before('<div class = "alert alert-danger alert-dismissible fade show" ><button type="button" class="close" data-dismiss="alert">&times;</button><strong></strong>Debes ingresar un ccomentario</div>');
  }else{
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
        setTimeout(function(){
          window.location.reload();
        });

        
      },
      error: function(error){
        Swal.fire({
          title: 'Lo sentimos!',
          html:'Para realizar cualquier comentario necesitas iniciar sesión<br>'+
                          '<br>Presiona aquí para '+'<b><a href="/accounts/login/">Iniciar Sesión</a></b><br>'+
                          '<br>o aquí para '+'<b><a href="/register/cogua/user/">Registrarte</a></b>',
          icon: 'warning'
        })
        
        
      }
    });
  }
	
}