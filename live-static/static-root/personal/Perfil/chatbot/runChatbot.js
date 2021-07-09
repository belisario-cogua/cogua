$(document).ready(function() {
  
  function getCookieChatbot(name) { 
    var cookieValue = null; 
    if (document.cookie && document.cookie !== '') { 
     var cookies = document.cookie.split(';'); 
     for (var i = 0; i < cookies.length; i++) { 
      var cookie = jQuery.trim(cookies[i]); 
      // Does this cookie string begin with the name we want? 
      if (cookie.substring(0, name.length + 1) === (name + '=')) { 
       cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
       break; 
      } 
     } 
    } 
    return cookieValue; 
  } 

  
  const dfMessenger = document.querySelector('df-messenger');
  dfMessenger.addEventListener('df-response-received', function (event) {
    var csrftoken = getCookieChatbot('csrftoken');
    data = event.detail.response;
    intento = data.queryResult.intent.displayName;
    
    console.log("estamos en el: " + intento)

    //intento verTurismos
    if (intento == "consultarCabaña") {
      tipoTurismos = data.queryResult.parameters.hotel;
      if(tipoTurismos == "cabañas"){
        abrirhoteles();
      }
    }else if (intento == "consultarLugarTuristico") {
      tipoTurismos = data.queryResult.parameters.lugarTuristico;
      if(tipoTurismos == "lugares turisticos"){
        abrirturismos();
      }
    }else if (intento == "consultarDeporte") {
      tipoTurismos = data.queryResult.parameters.deportes;
      if(tipoTurismos == "deportes"){
        abrirdeportes();
      }
    }else if (intento == "consultarPlato") {
      tipoTurismos = data.queryResult.parameters.platoTipico;
      if(tipoTurismos == "platos tipicos"){
        abrirplatos();
      }
    }else if (intento == "consultaTurismos - yesVerTurismos" || intento == "consultaTurismos - verTurismosDirecto"){
      tipoTurismos = data.queryResult.parameters.tipoTurismos;
      //parametro tipoturismos
      if(tipoTurismos == "cabañas"){
        abrirhoteles();
      }else if(tipoTurismos == "lugares turísticos"){
        abrirturismos();
      }else if(tipoTurismos == "deportes"){
        abrirdeportes();
      }else if(tipoTurismos == "platos típicos"){
        abrirplatos();
      }
    }
    else if (intento == "sugerenciasCOGUA") {
      tipoTurismo = data.queryResult.parameters.tipoTurismo;
      if (tipoTurismo == "cabaña") {
        dfMessenger.renderCustomText("te recomiendo reservar la cabaña que te voy a mostrar en el modal");
        sugerenciaHotel();
      }else if (tipoTurismo == "lugar turistico") {
        dfMessenger.renderCustomText("te recomiendo visitar el lugar turístico que te voy a mostrar en el modal");
        sugerenciaTurismo();
      }else if (tipoTurismo == "deporte") {
        dfMessenger.renderCustomText("te recomiendo reservar el deporte que te voy a mostrar en el modal");
        sugerenciaDeporte();
      }else if (tipoTurismo == "plato tipico") {
        dfMessenger.renderCustomText("te recomiendo reservar el plato típico que te voy a mostrar en el modal");
        sugerenciaPlato();
      }
      
    }

  });

//{
//  "richContent": [
//    [
//      {
//        "title": "Cabañas",
//        "type": "accordion",
//        "subtitle": "Ofrecemos hospedaje si deseas conocer mas lugares",
//        "text": "<img src='https://belisario-quevedo2.webnode.es/_files/200000012-d561ad65cf/700/18010916_240755849733227_1148845334981048006_n.jpg' width='400px' height='200px'/><br/><a target='_blank' href='/listado-cabañas-disponibles/' style='float: right;color:#FF9800;text-decoration: none;'>Cabañas Disponibles</a>"
//      }
//    ]
//  ]
//}

});
var user = $('#nombre-user').attr('data-value');

function abrirhoteles(){
  var contenedor = document.getElementById('contenedor_carga');
  contenedor.style.visibility = 'visible';
  contenedor.style.opacity = '1';

  $.ajax({
      url:"/chatbot/listar_hoteles/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
        turismo = response.turismo;
        if (turismo.length > 0) {
          $('#ListarChatbot').modal('show')
          var titulo;
          titulo = $("#h1-titulo");
          titulo.html("Cabañas disponibles");

          for(let i = 0;i < turismo.length;i++){
            imagen = '/media/'+turismo[i]["imagen"]+'/';
            nombre = turismo[i]["nombre"];
            costo = turismo[i]["precio"]
            let contenedor = '<div>';
            contenedor += '<div class="row">\n\
                        <div class="img-listar-turismo-chatbot">\n\
                          <img src="'+ imagen+'">\n\
                        </div>\n\
                        <div class="body-listar-chatbot" style="">\n\
                            <p><span>Cabaña:</span> '+nombre+'</p>\n\
                            <p><span>Costo:</span> $'+costo+'</p>\n\
                            <div class="btn-reservar-listar">';
            if (user != undefined) { 
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_hotel/'+turismo[i]['id']+'/\');">Reservar</a>';
            }else{
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_hotel/'+turismo[i]['id']+'/\');">Ver</a>';
            }
                           
            contenedor += '</div>\n\
                        </div>\n\
                      </div>\n\
                      <div class="dropdown-divider" style="margin-left: -6px;"></div>';
            contenedor += '</div>';
            $('#listar-turismos-chatbot').append(contenedor);
          }

          var btn;
          btn = $("#btn-cerrar-modal-chatbot");
          btn.html("<button class='btn btn-danger' type='button' data-dismiss='modal' id='button-click-cerrar' onclick='chatbotCerrarMensajeHotel();'>Cerrar</button>");
          $("#button-click-cerrar").click(function(event) {
            $("#listar-turismos-chatbot").empty();
          });
        }else{
          dfMessenger.renderCustomText("No he encontrado ninguna cabaña disponible, talvez puede interesarte otros turismos");
          const payload = [
          {
            "type": "chips",
            "options": [
              {
                "text": "ver platos típicos"
              },
              {
                "text": "ver lugares turísticos"
              },
              {
                "text": "ver deportes"
              },
              {
                "text": "Quizás después"
              }
            ]
          }
          ];
          dfMessenger.renderCustomCard(payload);
        }
      },
      error:function(error){
        console.log(error)
      }
    });
}

function abrirdeportes(){
  var contenedor = document.getElementById('contenedor_carga');
  contenedor.style.visibility = 'visible';
  contenedor.style.opacity = '1';
  
  $.ajax({
      url:"/chatbot/listar_deportes/",
      type: 'GET',
      dataType: "json",
      success:function(response){

        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
        turismo = response.turismo;
        if (turismo.length > 0) {
          $('#ListarChatbot').modal('show')
          var titulo;
          titulo = $("#h1-titulo");
          titulo.html("Deportes disponibles");

          for(let i = 0;i < turismo.length;i++){
            imagen = '/media/'+turismo[i]["imagen"]+'/';
            nombre = turismo[i]["nombre"];
            costo = turismo[i]["precio"]
            let contenedor = '<div>';
            contenedor += '<div class="row">\n\
                        <div class="img-listar-turismo-chatbot">\n\
                          <img src="'+ imagen+'">\n\
                        </div>\n\
                        <div class="body-listar-chatbot" style="">\n\
                            <p><span>Deporte:</span> '+nombre+'</p>\n\
                            <p><span>Costo:</span> $'+costo+'</p>\n\
                            <div class="btn-reservar-listar">';
            if (user != undefined) { 
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_deporte/'+turismo[i]['id']+'/\');">Reservar</a>';
            }else{
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_deporte/'+turismo[i]['id']+'/\');">Ver</a>';
            }
                           
            contenedor += '</div>\n\
                        </div>\n\
                      </div>\n\
                      <div class="dropdown-divider" style="margin-left: -6px;"></div>';
            contenedor += '</div>';
            $('#listar-turismos-chatbot').append(contenedor);
          }

          var btn;
          btn = $("#btn-cerrar-modal-chatbot");
          btn.html("<button class='btn btn-danger' type='button' data-dismiss='modal' id='button-click-cerrar' onclick='chatbotCerrarMensajeDeporte();'>Cerrar</button>");
          $("#button-click-cerrar").click(function(event) {
            $("#listar-turismos-chatbot").empty();
          });
        }else{
          dfMessenger.renderCustomText("No he encontrado ningún deporte disponible, talvez puede interesarte otros turismos");
          const payload = [
          {
            "type": "chips",
            "options": [
              {
                "text": "ver platos típicos"
              },
              {
                "text": "ver lugares turísticos"
              },
              {
                "text": "ver cabañas"
              },
              {
                "text": "Quizás después"
              }
            ]
          }
          ];
          dfMessenger.renderCustomCard(payload);
        }
        
      },
      error:function(error){
        console.log(error)
      }
    });
}
function abrirturismos(){
  var contenedor = document.getElementById('contenedor_carga');
  contenedor.style.visibility = 'visible';
  contenedor.style.opacity = '1';

  $.ajax({
      url:"/chatbot/listar_turismos/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
        turismo = response.turismo;
        if (turismo.length > 0) {
          $('#ListarChatbot').modal('show')
          var titulo;
          titulo = $("#h1-titulo");
          titulo.html("Lugares Turísticos disponibles");

          for(let i = 0;i < turismo.length;i++){
            imagen = '/media/'+turismo[i]["imagen"]+'/';
            nombre = turismo[i]["nombre"];
            costo = turismo[i]["precio"]
            let contenedor = '<div>';
            contenedor += '<div class="row">\n\
                        <div class="img-listar-turismo-chatbot">\n\
                          <img src="'+ imagen+'">\n\
                        </div>\n\
                        <div class="body-listar-chatbot" style="">\n\
                            <p><span>Lugar Turístico:</span> '+nombre+'</p>\n\
                            <p><span>Costo:</span> $'+costo+'</p>\n\
                            <div class="btn-reservar-listar">';
            if (user != undefined) { 
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_turismo/'+turismo[i]['id']+'/\');">Reservar</a>';
            }else{
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_turismo/'+turismo[i]['id']+'/\');">Ver</a>';
            }
                           
            contenedor += '</div>\n\
                        </div>\n\
                      </div>\n\
                      <div class="dropdown-divider" style="margin-left: -6px;"></div>';
            contenedor += '</div>';
            $('#listar-turismos-chatbot').append(contenedor);
          }

          var btn;
          btn = $("#btn-cerrar-modal-chatbot");
          btn.html("<button class='btn btn-danger' type='button' data-dismiss='modal' id='button-click-cerrar' onclick='chatbotCerrarMensajeTurismo();'>Cerrar</button>");
          $("#button-click-cerrar").click(function(event) {
            $("#listar-turismos-chatbot").empty();
          });

        }else{
          dfMessenger.renderCustomText("No he encontrado ningún lugar turístico disponible, talvez puede interesarte otros turismos");
          const payload = [
          {
            "type": "chips",
            "options": [
              {
                "text": "ver platos típicos"
              },
              {
                "text": "ver deportes"
              },
              {
                "text": "ver cabañas"
              },
              {
                "text": "Quizás después"
              }
            ]
          }
          ];
          dfMessenger.renderCustomCard(payload);
        } 
      },
      error:function(error){
        console.log(error)
      }
    });
}
function abrirplatos(){
  var contenedor = document.getElementById('contenedor_carga');
  contenedor.style.visibility = 'visible';
  contenedor.style.opacity = '1';

  $.ajax({
      url:"/chatbot/listar_platos/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
        turismo = response.turismo;

        if (turismo.length > 0) {
          $('#ListarChatbot').modal('show')
          var titulo;
          titulo = $("#h1-titulo");
          titulo.html("Platos Típicos disponibles");

          for(let i = 0;i < turismo.length;i++){
            imagen = '/media/'+turismo[i]["imagen"]+'/';
            nombre = turismo[i]["nombre"];
            costo = turismo[i]["precio"]
            let contenedor = '<div>';
            contenedor += '<div class="row">\n\
                        <div class="img-listar-turismo-chatbot">\n\
                          <img src="'+ imagen+'">\n\
                        </div>\n\
                        <div class="body-listar-chatbot" style="">\n\
                            <p><span>Plato Típico:</span> '+nombre+'</p>\n\
                            <p><span>Costo:</span> $'+costo+'</p>\n\
                            <div class="btn-reservar-listar">';
            if (user != undefined) { 
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_plato/'+turismo[i]['id']+'/\');">Reservar</a>';
            }else{
              contenedor += '<a style="color: #fff;" onclick="reservarTurismoChatbot(\'/chatbot/detalles_plato/'+turismo[i]['id']+'/\');">Ver</a>';
            }
                           
            contenedor += '</div>\n\
                        </div>\n\
                      </div>\n\
                      <div class="dropdown-divider" style="margin-left: -6px;"></div>';
            contenedor += '</div>';
            $('#listar-turismos-chatbot').append(contenedor);
          }

          var btn;
          btn = $("#btn-cerrar-modal-chatbot");
          btn.html("<button class='btn btn-danger' type='button' data-dismiss='modal' id='button-click-cerrar' onclick='chatbotCerrarMensajePlato();'>Cerrar</button>");
          $("#button-click-cerrar").click(function(event) {
            $("#listar-turismos-chatbot").empty();
          });

        }else{
          dfMessenger.renderCustomText("No he encontrado ningún plato típico disponible, talvez puede interesarte otros turismos");
          const payload = [
          {
            "type": "chips",
            "options": [
              {
                "text": "ver lugares turísticos"
              },
              {
                "text": "ver deportes"
              },
              {
                "text": "ver cabañas"
              },
              {
                "text": "Quizás después"
              }
            ]
          }
          ];
          dfMessenger.renderCustomCard(payload);
        }   
      },
      error:function(error){
        console.log(error)
      }
    });
}
function reservarTurismoChatbot(url){
  var contenedor = document.getElementById('contenedor_carga');
  contenedor.style.visibility = 'visible';
  contenedor.style.opacity = '1';
  $('#chatbotDetalles').load(url, function(){
    $(this).modal('show');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';
  });
}

function chatbotCerrarMensajeHotel(){
  const dfMessenger = document.querySelector('df-messenger');
  if (user != undefined) {
    dfMessenger.renderCustomText("Creo que no te gustaron las cabañas. Talvez puede interesarte algunas de las siguientes opciones");
    const payload = [
    {
      "type": "chips",
      "options": [
        {
          "text": "Ver platos típicos"
        },
        {
          "text": "Ver lugares turísticos"
        },
        {
          "text": "Ver deportes"
        },
        {
          "text": "Quizás después"
        }
      ]
    }
    ];
    dfMessenger.renderCustomCard(payload);
  }else{
    dfMessenger.renderCustomText("Creo que deberías iniciar sesión o registrate, es importante para que puedas reservar nuestros turismos");
  }
}
function chatbotCerrarMensajeDeporte(){
  const dfMessenger = document.querySelector('df-messenger');
  if (user != undefined) {
    dfMessenger.renderCustomText("Creo que no te gustaron los deportes. Talvez puede interesarte algunas de las siguientes opciones");
    const payload = [
    {
      "type": "chips",
      "options": [
        {
          "text": "Ver platos típicos"
        },
        {
          "text": "Ver lugares turísticos"
        },
        {
          "text": "Ver cabañas"
        },
        {
          "text": "Quizás después"
        }
      ]
    }
    ];
    dfMessenger.renderCustomCard(payload);
  }else{
    dfMessenger.renderCustomText("Creo que deberías iniciar sesión o registrate, es importante para que puedas reservar nuestros turismos");
  }
}

function chatbotCerrarMensajeTurismo(){
  const dfMessenger = document.querySelector('df-messenger');
  if (user != undefined) {
    dfMessenger.renderCustomText("Creo que no te gustaron los lugares turísticos. Talvez puede interesarte algunas de las siguientes opciones");
    const payload = [
    {
      "type": "chips",
      "options": [
        {
          "text": "Ver platos típicos"
        },
        {
          "text": "Ver cabañas"
        },
        {
          "text": "Ver deportes"
        },
        {
          "text": "Quizás después"
        }
      ]
    }
    ];
    dfMessenger.renderCustomCard(payload);
  }else{
    dfMessenger.renderCustomText("Creo que deberías iniciar sesión o registrate, es importante para que puedas reservar nuestros turismos");
  }
}
function chatbotCerrarMensajePlato(){
  const dfMessenger = document.querySelector('df-messenger');
  if (user != undefined) {
    dfMessenger.renderCustomText("Creo que no te gustaron los platos típicos. Talvez puede interesarte algunas de las siguientes opciones");
    const payload = [
    {
      "type": "chips",
      "options": [
        {
          "text": "Ver cabañas"
        },
        {
          "text": "Ver lugares turísticos"
        },
        {
          "text": "Ver deportes"
        },
        {
          "text": "Quizás después"
        }
      ]
    }
    ];
    dfMessenger.renderCustomCard(payload);
  }else{
    dfMessenger.renderCustomText("Creo que deberías iniciar sesión o registrate, es importante para que puedas reservar nuestros turismos");
  }
  
  
}

//Sugerencias de cada turismo
function sugerenciaHotel(){
  $.ajax({
      url:"/chatbot/sugerencia_hotel/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        url = "/chatbot/detallles_sugerencia_hotel/"+response.sugerencia.id+"/"
        reservarTurismoChatbot(url)
      },
      error:function(error){
        console.log(error)
      }
    });
}

function sugerenciaDeporte(){
  $.ajax({
      url:"/chatbot/sugerencia_deporte/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        url = "/chatbot/detallles_sugerencia_deporte/"+response.sugerencia.id+"/"
        reservarTurismoChatbot(url)
      },
      error:function(error){
        console.log(error)
      }
    });
}

function sugerenciaTurismo(){
  $.ajax({
      url:"/chatbot/sugerencia_turismo/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        url = "/chatbot/detallles_sugerencia_turismo/"+response.sugerencia.id+"/"
        reservarTurismoChatbot(url)
      },
      error:function(error){
        console.log(error)
      }
    });
}

function sugerenciaPlato(){
  $.ajax({
      url:"/chatbot/sugerencia_plato/",
      type: 'GET',
      dataType: "json",
      success:function(response){
        url = "/chatbot/detallles_sugerencia_plato/"+response.sugerencia.id+"/"
        reservarTurismoChatbot(url)
      },
      error:function(error){
        console.log(error)
      }
    });
}