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
    data = event.detail.response;
    intento = data.queryResult.intent.displayName;
    console.log("estamos en el: " + intento)
    //intento verTurismos
    if (intento == "consultaTurismos - yesVerTurismos" || intento == "consultaTurismos - verTurismosDirecto"){
      tipoTurismos = data.queryResult.parameters.tipoTurismos;
      //parametro tipoturismos
        var csrftoken = getCookieChatbot('csrftoken'); 
        data = {
            'chatbotIntento': intento,
            'chatbottipoTurismos': tipoTurismos,
            csrfmiddlewaretoken: csrftoken
        }
        $.ajax({
            data:data,
            url:"/perfil/chatbot/",
            type: 'POST',
            success:function(response){
                if(response.mensaje){
                  if(tipoTurismos == "cabañas"){
                    dfMessenger.renderCustomText('Lo siento no están disponibles las cabañas por el momento');
                  }else if(tipoTurismos == "lugares turísticos"){
                    dfMessenger.renderCustomText('Lo siento no están disponibles lus lugares turísticos por el momento');
                  }else if(tipoTurismos == "deportes"){
                    dfMessenger.renderCustomText('Lo siento no están disponibles los deportes por el momento');
                  }else if(tipoTurismos == "platos típicos"){
                    dfMessenger.renderCustomText('Lo siento no están disponibles los platos típicos por el momento');
                  }
                }else{
                  if(tipoTurismos == "cabañas"){
                    for(let i = 0;i < response.length;i++){
                      const payload = [
                        {
                          "title": response[i]["fields"]['nombre'],
                          "type": "accordion",
                          "subtitle": '$'+response[i]["fields"]['precio'],
                          "text": '<img src="/media/'+ response[i]["fields"]['imagen']+'" style="width:305px;height:200px;float:right;"/><br/><a target="_blank" href="/listado-cabañas-disponibles/" style="float: right;color:#FF9800;text-decoration: none;">Visita las cabañas</a>'
                        }
                      ];
                      dfMessenger.renderCustomCard(payload);
                    }
                    dfMessenger.renderCustomText('¿Interesante verdad? ¿Deseas reservar alguna cabaña?');
                  }else if(tipoTurismos == "lugares turísticos"){
                    for(let i = 0;i < response.length;i++){
                      const payload = [
                        {
                          "title": response[i]["fields"]['nombre'],
                          "type": "accordion",
                          "subtitle": '$'+response[i]["fields"]['precio'],
                          "text": '<img src="/media/'+ response[i]["fields"]['imagen']+'" style="width:305px;height:200px;float:right;"/><br/><a target="_blank" href="/listado-lugares-turisticos-disponibles/" style="float: right;color:#FF9800;text-decoration: none;">Visita los lugares turísticos</a>'
                        }
                      ];
                      dfMessenger.renderCustomCard(payload);
                    }
                    dfMessenger.renderCustomText('¿Interesante verdad? ¿Deseas reservar algun lugar turístico?');
                  }else if(tipoTurismos == "deportes"){
                    for(let i = 0;i < response.length;i++){
                      const payload = [
                        {
                          "title": response[i]["fields"]['nombre'],
                          "type": "accordion",
                          "subtitle": '$'+response[i]["fields"]['precio'],
                          "text": '<img src="/media/'+ response[i]["fields"]['imagen']+'" style="width:305px;height:200px;float:right;"/><br/><a target="_blank" href="/listado-deportes-disponibles/" style="float: right;color:#FF9800;text-decoration: none;">Conoce los deportes</a>'
                        }
                      ];
                      dfMessenger.renderCustomCard(payload);
                    }
                    dfMessenger.renderCustomText('¿Interesante verdad? ¿Deseas reservar algun deporte?');
                  }else if(tipoTurismos == "platos típicos"){
                    for(let i = 0;i < response.length;i++){
                      const payload = [
                        {
                          "title": response[i]["fields"]['nombre'],
                          "type": "accordion",
                          "subtitle": '$'+response[i]["fields"]['precio'],
                          "text": '<img src="/media/'+ response[i]["fields"]['imagen']+'" style="width:305px;height:200px;float:right;"/><br/><a target="_blank" href="/listado-platos-tipicos-disponibles/" style="float: right;color:#FF9800;text-decoration: none;">Conoce los platos típicos</a>'
                        }
                      ];
                      dfMessenger.renderCustomCard(payload);
                    }
                    dfMessenger.renderCustomText('¿Interesante verdad? ¿Deseas reservar algun plato típico?');
                  }
                }
            },
            error:function(error){
              console.log("error del intento consultaTurismos - yesVerTurismos")
            }
          });

    //intento test-intent
    }else if (intento == "solicitudReservaTurismo" || intento == "solicitudReservaTurismo - repeticion"){
      var csrftoken = getCookieChatbot('csrftoken'); 
      //solicitudTipoTurismo = data.queryResult.parameters.solicitudTipoTurismo; -> nombre de la identidad
      if (intento == "solicitudReservaTurismo") {
        solicitudTipoTurismo = data.queryResult.parameters.solicitudTipoTurismo;
        console.log("intento 1: "+intento + " |tipo turismo: "+tipoTurismos+" |solicitudtipoturismo: "+solicitudTipoTurismo)
        data = {
            'chatbotIntento': intento,
            'chatbottipoTurismos': tipoTurismos,
            'solicitudTipoTurismo': solicitudTipoTurismo[0],
            csrfmiddlewaretoken: csrftoken
        }
      }else if (intento == "solicitudReservaTurismo - repeticion") {
        solicitudTipoTurismo = data.queryResult.parameters.solicitudtipoturismo;
        console.log("intento 2: "+intento + " |tipo turismo: "+tipoTurismos+" |solicitudtipoturismo: "+solicitudTipoTurismo)
        data = {
            'chatbotIntento': intento,
            'chatbottipoTurismos': tipoTurismos,
            'solicitudTipoTurismo': solicitudTipoTurismo[0],
            csrfmiddlewaretoken: csrftoken
        }
      }
      $.ajax({
          data:data,
          url:"/perfil/chatbot/",
          type: 'POST',
          success:function(response){
              if (response.mensaje == "False") {
                console.log(response.error)
                function noExistePlato() {
                  if (tipoTurismos == "cabañas" || tipoTurismos == "Cabañas") {
                    const noExiste = [
                      {
                        "type": "list",
                        "title": "Lo siento no he encontrado "+solicitudTipoTurismo[0],
                        "subtitle": "Haz click aquí para realizar tu petición nuevamente y puedas reservar la Cabaña",
                        "event": {
                          "name": "repeticion",
                          "languageCode": "es",
                          "parameters": {}
                        }
                      }
                    ];
                    dfMessenger.renderCustomCard(noExiste);
                  }
                  else if (tipoTurismos == "lugares turisticos" || tipoTurismos == "lugares turísticos") {
                    const noExiste = [
                      {
                        "type": "list",
                        "title": "Lo siento no he encontrado "+solicitudTipoTurismo[0],
                        "subtitle": "Haz click aquí para realizar tu petición nuevamente y puedas reservar el Lugar Turístico",
                        "event": {
                          "name": "repeticion",
                          "languageCode": "es",
                          "parameters": {}
                        }
                      }
                    ];
                    dfMessenger.renderCustomCard(noExiste);
                  }
                  else if (tipoTurismos == "deportes" || tipoTurismos == "Deportes") {
                    const noExiste = [
                      {
                        "type": "list",
                        "title": "Lo siento no he encontrado "+solicitudTipoTurismo[0],
                        "subtitle": "Haz click aquí para realizar tu petición nuevamente y puedas reservar el Deporte",
                        "event": {
                          "name": "repeticion",
                          "languageCode": "es",
                          "parameters": {}
                        }
                      }
                    ];
                    dfMessenger.renderCustomCard(noExiste);
                  }
                  else if (tipoTurismos == "platos tipicos" || tipoTurismos == "platos típicos") {
                    const noExiste = [
                      {
                        "type": "list",
                        "title": "Lo siento no he encontrado "+solicitudTipoTurismo[0],
                        "subtitle": "Haz click aquí para realizar tu petición nuevamente y puedas reservar el Plato Típico",
                        "event": {
                          "name": "repeticion",
                          "languageCode": "es",
                          "parameters": {}
                        }
                      }
                    ];
                    dfMessenger.renderCustomCard(noExiste);
                  }
                 
                }
                 
                setTimeout(noExistePlato,1000);
              }else if (response.mensaje != "False") {
              dfMessenger.renderCustomText('De acuerdo, debes utilizar el siguiente calendario para indicarme tus fechas de visita');
              const payload = [
                {
                  "type": "list",
                  "title": "Calendario",
                  "subtitle": "haz click aquí para que puedas escoger las fechas disponibles"
                }
              ];
              
              dfMessenger.renderCustomCard(payload);
              var startDate;
              var endDate;
              var fechaActual = new Date();
              var fechaActualmasUnAño = new Date();
              fechaActualmasUnAño.setFullYear(fechaActual.getFullYear()+1);

              $('input[name="daterange"]').val('');
              $('input[name="daterange"]').daterangepicker({ startDate: '03/05/2021', endDate: '03/08/2021' });
              $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
                  $(this).val(' Desde el ' + picker.startDate.format('DD/MM/YYYY') + '  hasta el  ' + picker.endDate.format('DD/MM/YYYY'));
              });
              $('input[name="daterange"]').daterangepicker({
                  "applyClass": "btn-success",
                  "cancelClass": "btn-danger",
                  "minDate": fechaActual,
                  "maxDate": fechaActualmasUnAño ,
                  "opens": "left",
                  "drops": "up",
                  "locale": {
                      "format": "DD/MM/YYYY",
                      "separator": " - ",
                      "applyLabel": "Guardar fechas",
                      "cancelLabel": "Cancelar",
                      "fromLabel": "Desde",
                      "toLabel": "Hasta",
                      "customRangeLabel": "Personalizar",
                      "daysOfWeek": [
                          "Do",
                          "Lu",
                          "Ma",
                          "Mi",
                          "Ju",
                          "Vi",
                          "Sa"
                      ],
                      "monthNames": [
                          "Enero",
                          "Febrero",
                          "Marzo",
                          "Abril",
                          "Mayo",
                          "Junio",
                          "Julio",
                          "Agosto",
                          "Setiembre",
                          "Octubre",
                          "Noviembre",
                          "Diciembre"
                      ],
                      "firstDay": 1
                  },
                  showDropdowns: true,
                  showTopbar: true,
                  isInvalidDate: function(date) {
                      var id = response;
                      var nombre = [];

                      for(i in id){
                        var current = id[i];
                        var acceder1 = current.fields.fecha_inicial;
                        var acceder2 = current.fields.fecha_final;
                        nombre.push({ 'start': moment(acceder1), 'end': moment(acceder2) });
                      }
                      
                      return nombre.reduce(function(bool, range) {
                          return bool || (date >= range.start && date <= range.end);
                      }, false);
                  }

              },
              function est(start, end) {
                  var capturarfechainicial = start.format('YYYY-MM-DD');
                  var capturarfechaifinal = end.format('YYYY-MM-DD');
                  startDate = capturarfechainicial;
                  endDate = capturarfechaifinal;

                  console.log("fecha: "+ startDate);
              });

              $('#responder').click(function(){
                var letrasFecha = startDate;
                var letrasFecha1 = endDate;
                letrasfechaReserva = new Date(letrasFecha.replace(/-/g, '\/').replace(/T.+/, ''));
                letrasfechaReserva1 = new Date(letrasFecha1.replace(/-/g, '\/').replace(/T.+/, ''));

                var day = letrasfechaReserva.getDate();
                var month = letrasfechaReserva.getMonth();
                var year = letrasfechaReserva.getFullYear();

                var day1 = letrasfechaReserva1.getDate();
                var month1 = letrasfechaReserva1.getMonth();
                var year1 = letrasfechaReserva1.getFullYear();

                var dias = ["Domingo","Lunes", "Martes", "Miercoles","Jueves", "Viernes", "Sábado"];
                var meses = [
                  "Enero", "Febrero", "Marzo",
                  "Abril", "Mayo", "Junio", "Julio",
                  "Agosto", "Septiembre", "Octubre",
                  "Noviembre", "Diciembre"
                ];

                dfMessenger.renderCustomText('OK. Tu viaje comienza:\n'+'El ' + dias[letrasfechaReserva.getDay()] +' '+ day + ' de ' + meses[month] + '\ny termina el: ' + dias[letrasfechaReserva1.getDay()] +' '+ day1 + ' de ' + meses[month1] + '\nSelecciona la opción confirmar si estas de acuerdo');
                var temporal = month + 1;
                var temporal1 = month1 + 1;

                const payload = [
                  {
                    "options": [
                      {
                        "text": "confirmar "+ year+'-'+day+'-'+temporal+' / '+year1+'-'+day1+'-'+temporal1
                      },
                      {
                        "text": "Cancelar Reserva"
                      }
                    ],
                    "type": "chips"
                  }
                ];
                dfMessenger.renderCustomCard(payload);
                $('#modalFullCalendar').modal('hide');
              });
            }
              //
          },
          error:function(error){
            console.log("error del intento solicitudReservaTurismo")
          }
        });

      //evento para abrir el modal del calendario
      dfMessenger.addEventListener('df-list-element-clicked', function (event) {
        click = event.detail.element.title;

        if(click == "Calendario"){
          $('#modalFullCalendar').modal('show')
        }
      });
     

    }else if (intento == "solicitudReservaTurismo - repeat"){
      var textos = new Array()
      textos[0] = "Te muestro nuevamente el listado de "+tipoTurismos+", selecciona el que te gustó más";
      textos[1] = "Te muestro la lista de "+tipoTurismos+", puedes seleccionar el que te gustó más";

      nro = Math.floor(Math.random() * (textos.length - 0) + 0);//obtienes el valor aleatorio siempre acorde al tamaño de tu array
      dfMessenger.renderCustomText(textos[nro]);

      var csrftoken = getCookieChatbot('csrftoken'); 
      data = {
        'chatbotIntento': intento,
        'chatbottipoTurismos': tipoTurismos,
        csrfmiddlewaretoken: csrftoken
      }
      $.ajax({
          data:data,
          url:"/perfil/chatbot/",
          type: 'POST',
          success:function(response){
              for(let i = 0;i < response.length;i++){
                  const payload = [
                  {
                    "type": "chips",
                    "options": [
                      {
                        "text": response[i]["fields"]['nombre']
                      },
                    ]
                  }
                  ];
                  dfMessenger.renderCustomCard(payload);
                }
              
          },
          error:function(error){
            console.log("error del intento solicitudReservaTurismo - repeat")
          }
        });

    }else if (intento == "fechasReservaTurismo" || intento == "repeticion - fechasReservaTurismo"){
      console.log("probando "+tipoTurismos)
      var tempoSolicitudTipoTurismo = solicitudTipoTurismo;
      if (intento == "fechasReservaTurismo") {
        dialogFlowDate = data.queryResult.parameters.date;
        dialogFlowDate1 = data.queryResult.parameters.date1;

        newdialogFlowDate = new Date(dialogFlowDate.replace(/-/g, '\/').replace(/T.+/, ''));
        var day = newdialogFlowDate.getDate();
        var month = newdialogFlowDate.getMonth()+1;
        var year = newdialogFlowDate.getFullYear();
        var obtenerNewdialogFlowDate = year+'-'+month+'-'+day;

        newdialogFlowDate1 = new Date(dialogFlowDate1.replace(/-/g, '\/').replace(/T.+/, ''));
        var day1 = newdialogFlowDate1.getDate();
        var month1 = newdialogFlowDate1.getMonth()+1;
        var year1 = newdialogFlowDate1.getFullYear();
        var obtenerNewdialogFlowDate1 = year1+'-'+month1+'-'+day1;
        console.log(intento)
        console.log(dialogFlowDate)
        console.log(dialogFlowDate1)
        console.log(tempoSolicitudTipoTurismo)
        var csrftoken = getCookieChatbot('csrftoken');
        data = {
            'chatbotIntento': intento,
            'dialogFlowDate': obtenerNewdialogFlowDate,
            'dialogFlowDate1': obtenerNewdialogFlowDate1,
            'tempoSolicitudTipoTurismo': tempoSolicitudTipoTurismo[0],
            csrfmiddlewaretoken: csrftoken
        }
        if (tipoTurismos == "lugares turisticos" || tipoTurismos == "lugares turísticos") {
          console.log("desde lugares turisticos")
          urltemp = "/perfil/reservar_turismo_chatbot/";
        }else if (tipoTurismos == "deportes" || tipoTurismos == "Deportes") {
          console.log("desde deportes")
          urltemp = "/perfil/reservar_deporte_chatbot/";
        }
        else if (tipoTurismos == "platos tipicos" || tipoTurismos == "platos típicos") {
          console.log("desde platos tipicos")
          urltemp = "/perfil/reservar_plato_chatbot/";
        }
      }else if (intento == "repeticion - fechasReservaTurismo") {
        dialogFlowDate = data.queryResult.parameters.date2;
        dialogFlowDate1 = data.queryResult.parameters.date3;

        newdialogFlowDate = new Date(dialogFlowDate.replace(/-/g, '\/').replace(/T.+/, ''));
        var day = newdialogFlowDate.getDate();
        var month = newdialogFlowDate.getMonth()+1;
        var year = newdialogFlowDate.getFullYear();
        var obtenerNewdialogFlowDate = year+'-'+month+'-'+day;

        newdialogFlowDate1 = new Date(dialogFlowDate1.replace(/-/g, '\/').replace(/T.+/, ''));
        var day1 = newdialogFlowDate1.getDate();
        var month1 = newdialogFlowDate1.getMonth()+1;
        var year1 = newdialogFlowDate1.getFullYear();
        var obtenerNewdialogFlowDate1 = year1+'-'+month1+'-'+day1;
        console.log(intento)
        console.log(dialogFlowDate)
        console.log(dialogFlowDate1)
        console.log(tempoSolicitudTipoTurismo)
        var csrftoken = getCookieChatbot('csrftoken'); 
        data = {
            'chatbotIntento': intento,
            'dialogFlowDate': obtenerNewdialogFlowDate,
            'dialogFlowDate1': obtenerNewdialogFlowDate1,
            'tempoSolicitudTipoTurismo': tempoSolicitudTipoTurismo[0],
            csrfmiddlewaretoken: csrftoken
        }
        if (tipoTurismos == "lugares turisticos" || tipoTurismos == "lugares turísticos") {
          console.log("desde lugares turisticos")
          urltemp = "/perfil/reservar_turismo_chatbot/";
        }else if (tipoTurismos == "deportes" || tipoTurismos == "Deportes") {
          console.log("desde deportes")
          urltemp = "/perfil/reservar_deporte_chatbot/";
        }
        else if (tipoTurismos == "platos tipicos" || tipoTurismos == "platos típicos") {
          console.log("desde platos tipicos")
          urltemp = "/perfil/reservar_plato_chatbot/";
        }
      }
      
      $.ajax({
          data:data,
          url:urltemp,
          type: 'POST',
          success:function(response){
              console.log(response.mensaje);
              if (response.mensaje == "tipo_turismo") {
                dfMessenger.renderCustomText("Tu reserva del lugare turístico esta listo, puedes revisarlo en tu Perfil-Mis Reservas.");
              }else if (response.mensaje == "tipo_deportes") {
                dfMessenger.renderCustomText("Tu reserva del deporte esta listo, puedes revisarlo en tu Perfil-Mis Reservas.");
              }else if (response.mensaje == "tipo_plato") {
                dfMessenger.renderCustomText("Tu reserva del plato tipico esta listo, puedes revisarlo en tu Perfil-Mis Reservas.");
              }else if(response.mensaje == "False"){
                dfMessenger.renderCustomText("Creo que deberías seleccionar otras fechas de visita.");
              } 
          },
          error:function(error){
            console.log("error del intento fechasReservaTurismo")
          }
        });
    }else if (intento == "test-intent") {
      var csrftoken = getCookieChatbot('csrftoken'); 
      data = {
          'chatbot': "chatbot1hola",
          csrfmiddlewaretoken: csrftoken
      }
      $.ajax({
          data:data,
          url:"/perfil/",
          type: 'POST',
          success:function(response){
              //let id = response.nuevo;
              //let nombre = "";
              //for(i in id){
                //let current = id[i];
                //nombre = current.imagen;
                //etc ...
              //}
              for(let i = 0;i < response.length;i++){
                const payload = [
                {
                  "title": response[i]["fields"]['nombre'],
                  "type": "accordion",
                  "subtitle": response[i]["fields"]['descripcion'],
                  "text": "<img src='/media/' width='400px' height='200px'/><br/><a target='_blank' href='/listado-cabañas-disponibles/' style='float: right;color:#FF9800;text-decoration: none;'>Cabañas Disponibles</a>"
                }
                ];
                dfMessenger.renderCustomCard(payload);
              }
              
          },
          error:function(error){
            console.log("error del intento test-intent")
          }
        });

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