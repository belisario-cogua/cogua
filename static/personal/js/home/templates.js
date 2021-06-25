
//funcion que me permite llamar a la funcion de peticion ajax, en este caso listar platos
$(document).ready(function(){
    listarPublicacionesTable();
    listarPublicacionesRecientes();
});
//funciona para listar turismos con peticion ajax
var $ = jQuery.noConflict();
function listarPublicacionesTable(){
	$.ajax({
		url: "/home/publicaciones/",
		type: "get",
		dataType: "json",
		success: function(response){

			if($.fn.DataTable.isDataTable('#tabla_publicacion')){
				$('#tabla_publicacion ').DataTable().destroy();
			}
			$('#tabla_publicacion tbody').html("");
			var temp = response.data;
			for(let i = 0;i < temp.length;i++){
				var t = temp[i]["contador"]
				var n_coment = t.length;
				n_coment = (n_coment < 10 && n_coment > 0 ? "0" : "") + n_coment;
				var ncoment = "";
				if (n_coment==1) {
					ncoment = n_coment + " comentario";
				}else{
					ncoment = n_coment + " comentarios";
				}
				let fila = '<tr>';
				created = temp[i]["created"];
				date = new Date(created);
				dia = date.getDate();
				mes = date.getMonth();
				hora = date.getHours();
				hora = (hora < 10 ? "0" : "") + hora;
				minutos = date.getMinutes();
				minutos = (minutos < 10 ? "0" : "") + minutos;

				var mostrarHora = "";
				if (hora < 12) {
					if (hora == 1) {
						mostrarHora = "publicado: a la " + hora + ':' + minutos + ' am';
					}else{
						mostrarHora = "publicado: a las " + hora + ':' + minutos + ' am';
					}
				}else{
					if (hora == 13) {
						mostrarHora = "publicado: a la " + hora + ':' + minutos + ' pm';
					}else{
						mostrarHora = "publicado: a las " + hora + ':' + minutos + ' pm';
					}
				}

				var meses = [
							  "Enero", "Febrero", "Marzo",
							  "Abril", "Mayo", "Junio", "Julio",
							  "Agosto", "Septiembre", "Octubre",
							  "Noviembre", "Diciembre"
							]

				function MaysPrimera(string){
				  return string.charAt(0).toUpperCase() + string.slice(1);
				}
				nombre = temp[i]['titulo'];
				nombre = MaysPrimera(nombre.toLowerCase());

				fila += '<td style="border: 0px solid black;"><div class="blog_item_img puntero-pointer">\n\
								<img class="card-img rounded-0" src="/media/'+ temp[i]['imagen']+'"/">\n\
								<a onclick="abrir_publicacion_detalles(\'/home/detalle/publicacion/'+temp[i]['id']+'/\');" class="blog_item_date">\n\
									<h3>' + dia + '</h3>\n\
							        <p>' + meses[mes] + '</p>\n\
							    </a>\n\
							    <p class="publicado-tiempo">' + mostrarHora + '</p>\n\
							    </div>\n\
								<div class="blog_details puntero-pointer">\n\
				<a onclick="abrir_publicacion_detalles(\'/home/detalle/publicacion/'+temp[i]['id']+'/\');">\n\
										<h2>' + nombre+'</h2>\n\
									</a>\n\
									<p>' + temp[i]['descripcion']+'</p>\n\
									<ul class="blog-info-link">\n\
							            <li><a onclick="abrir_publicacion_detalles(\'/home/detalle/publicacion/'+temp[i]['id']+'/\');"><i class="fas fa-user"></i> Cogua</a></li>\n\
							            <li><a onclick="abrir_publicacion_detalles(\'/home/detalle/publicacion/'+temp[i]['id']+'/\');"><i class="fas fa-comments"></i>'+ncoment+'</a></li>\n\
							        </ul>\n\
								</div></td>';
				fila += '</tr>';
				$('#tabla_publicacion tbody').append(fila);
			}
			$('#tabla_publicacion').DataTable({
				//estos son parametros que tiene definido el data table internamente
				iDisplayLength: 3,
				bSort : false,
				language: {
		          decimal: "",
		          emptyTable: "No existen publicaciones",
		          info: "",
		          infoEmpty: "",
		          infoFiltered: "",
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
		            next: $('#siguiente'),
		            previous: $('#anterior'),
		          },
		        },
			});
		},
		error: function(error){
			console.log(error);
		}
	});
}
function listarPublicacionesRecientes(){
    $.ajax({
        url: "/home/publicaciones/recientes/",
        type: "get",
        dataType: "json",
        success: function(response){
            for(let i = 0;i < response.length;i++){
				let contenedor = '<div style="margin-top:20px;">';

				created = response[i]["fields"]["created"];
				date = new Date(created);
				dia = date.getDate();
				mes = date.getMonth();
				year = date.getFullYear();
				var meses = [
							  "Enero", "Febrero", "Marzo",
							  "Abril", "Mayo", "Junio", "Julio",
							  "Agosto", "Septiembre", "Octubre",
							  "Noviembre", "Diciembre"
							]

				contenedor += '<div class="media post_item ">\n\
									<img src="/media/'+ response[i]["fields"]['imagen']+'" alt="post" style="width: 75px; height:80px;">\n\
									<div class="media-body puntero-pointer">\n\
								    	<a onclick="abrir_publicacion_detalles(\'/home/detalle/publicacion/'+response[i]['pk']+'/\');">\n\
								    		<h3>' + response[i]["fields"]['nombre']+'</h3>\n\
								    	</a>\n\
										<p>'+meses[mes]+' '+dia+','+year+'</p>\n\
									</div>\n\
								</div>';

				contenedor += '</div>';
				$('#publicaciones_recientes').append(contenedor);
			}
        },
        error: function(error){
            console.log(error);
        }
    });
}


function abrir_publicacion_detalles(url){
window.location = url;
}