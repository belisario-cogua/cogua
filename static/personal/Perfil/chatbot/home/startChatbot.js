$(document).ready(function() {
 
  var user = $('#nombre-user-home').attr('data-value');
  
    window.addEventListener('dfMessengerLoaded', function (event) {
          
          $dfMessenger = document.querySelector("df-messenger");
          $r2 = $dfMessenger.shadowRoot.querySelector("df-messenger-chat");
          $r3 = $r2.shadowRoot.querySelector("df-messenger-user-input"); //for other mods
          
          var sheet = new CSSStyleSheet;
          sheet.replaceSync( `div.chat-wrapper[opened="true"] { height: 500px }`);
          $r2.shadowRoot.adoptedStyleSheets = [ sheet ];
          var textos1 = new Array()
          textos1[0] = "¿Necesitas ayuda?";
          textos1[1] = "¡Hola!";
          respuesta1 = Math.floor(Math.random() * (textos1.length - 0) + 0);
          $dfMessenger.renderCustomText(textos1[respuesta1]);
          $dfMessenger.renderCustomText("Soy el asistente de cogua");
          $dfMessenger.renderCustomText("Puede interesarte una de las siguientes opciones o preguntame cualquier cosa.");
          const payload = [
            {
              "type": "chips",
              "options": [
                {
                  "text": "¿En donde se encuentran ubicados?"
                }
              ]
            }
            ];
            const payload1 = [
            {
              "type": "chips",
              "options": [
                {
                  "text": "¿Que turismos tienen disponibles?"
                }
              ]
            }
            ];
            const payload2 = [
            {
              "type": "chips",
              "options": [
                {
                  "text": "¿Cual es su horario de atención?"
                }
              ]
            }
          ];
          $dfMessenger.renderCustomCard(payload);
          $dfMessenger.renderCustomCard(payload1);
          $dfMessenger.renderCustomCard(payload2);
    });
  
  

});