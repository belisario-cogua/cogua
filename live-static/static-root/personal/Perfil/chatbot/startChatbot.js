$(document).ready(function() {
 
  var user = $('#nombre-user').attr('data-value');
  var login1 = $('#login1').attr('data-value');
  var login2 = $('#login2').attr('data-value');
  var login3 = $('#login3').attr('data-value');

  var sesion1 = login1;
  var sesion2 = login2;
  var sesion3 = login3;

  var date = new Date();
  hora =   date.getHours();
  minuto = date.getMinutes();
  segundo = date.getSeconds()-5;

  
  


  window.addEventListener('dfMessengerLoaded', function (event) {
      
      $dfMessenger = document.querySelector("df-messenger");
      $r2 = $dfMessenger.shadowRoot.querySelector("df-messenger-chat");
      $r3 = $r2.shadowRoot.querySelector("df-messenger-user-input"); //for other mods
      
      var sheet = new CSSStyleSheet;
      sheet.replaceSync( `div.chat-wrapper[opened="true"] { height: 500px }`);
      $r2.shadowRoot.adoptedStyleSheets = [ sheet ];

      if(sesion1 >= 1 && sesion1 < 12){
        if(sesion3 >= 0 || sesion2 >=0 || sesion1 >=0){
          sesion33 = parseInt(sesion3) + 17;
          sesion22 = parseInt(sesion2) + 12;
          sesion11 = parseInt(sesion1) + 12;

          segundo1 = segundo+17;
          minuto1 = minuto + 12;
          hora1 = hora + 12;

          horas_sesion = sesion11 + ":" + sesion22 + ":" + sesion33;
          horas = hora1 + ":" + minuto1 + ":" + segundo1;

          if(horas_sesion >  horas){
             $dfMessenger.renderCustomText('Buenos días '+ user);
          }else{
            $dfMessenger.addEventListener('df-response-received', function (event) {
                data = event.detail.response;
                intento = data.queryResult.intent.displayName;
                if (intento == "Default Welcome Intent") {
                  
                  $dfMessenger.renderCustomText('¡Hola! ' + user);
                }
            });
            $dfMessenger.renderCustomText('cogua online');
          }
        }
      }else if(sesion1 >= 12 && sesion1 < 18){
        if(sesion3 >= 0 || sesion2 >=0 || sesion1 >=0){
          sesion33 = parseInt(sesion3) + 17;
          sesion22 = parseInt(sesion2) + 12;
          sesion11 = parseInt(sesion1) + 12;

          segundo1 = segundo+17;
          minuto1 = minuto + 12;
          hora1 = hora + 12;

          horas_sesion = sesion11 + ":" + sesion22 + ":" + sesion33;
          horas = hora1 + ":" + minuto1 + ":" + segundo1;

          if(horas_sesion >  horas){
             $dfMessenger.renderCustomText('Buenos tardes ' + user);
          }else{
            $dfMessenger.addEventListener('df-response-received', function (event) {
                data = event.detail.response;
                intento = data.queryResult.intent.displayName;
                if (intento == "Default Welcome Intent") {
                  
                  $dfMessenger.renderCustomText('¡Hola! ' + user);
                }
            });
            $dfMessenger.renderCustomText('cogua online');
          }
        }
      }else if(sesion1 >= 18 && sesion1 < 24){
        if(sesion3 >= 0 || sesion2 >=0 || sesion1 >=0){
          sesion33 = parseInt(sesion3) + 17;
          sesion22 = parseInt(sesion2) + 12;
          sesion11 = parseInt(sesion1) + 12;

          segundo1 = segundo+17;
          minuto1 = minuto + 12;
          hora1 = hora + 12;

          horas_sesion = sesion11 + ":" + sesion22 + ":" + sesion33;
          horas = hora1 + ":" + minuto1 + ":" + segundo1;

          if(horas_sesion >  horas){
            $dfMessenger.renderCustomText('Buenas noches ' + user);
          }else{

            $dfMessenger.addEventListener('df-response-received', function (event) {
                data = event.detail.response;
                intento = data.queryResult.intent.displayName;
                if (intento == "Default Welcome Intent") {
                  
                  $dfMessenger.renderCustomText('¡Hola! ' + user);
                }
            });
            $dfMessenger.renderCustomText('cogua online');
          }
        }
      }
      
  });

});