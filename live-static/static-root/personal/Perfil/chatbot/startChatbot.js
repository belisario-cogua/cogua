$(document).ready(function() {
 
  var user = $('#nombre-user').attr('data-value');
  if (user !== undefined) {
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
              var textos2 = new Array()
              textos2[0] = "";
              textos2[1] = "Me alegra saber que buscas mejorar tus experiencias con nuestros turismos";
              respuesta2 = Math.floor(Math.random() * (textos2.length - 0) + 0);

              $dfMessenger.renderCustomText("Soy el asistente de cogua");
              $dfMessenger.renderCustomText(textos2[respuesta2]);
              $dfMessenger.renderCustomText("Puedes preguntarme cualquier cosa o seleccionar algunas de las siguientes opciones.");
              var textos3 = new Array()
                    textos3[0] = "¿Que cabaña me recomiendas?";
                    textos3[1] = "¿Que plato típico me recomiendas?";
                    textos3[2] = "¿Que lugar turístico me recomiendas visitar?";
                    textos3[3] = "¿Que deporte me recomiendas reservar?";
                    respuesta3 = Math.floor(Math.random() * (textos3.length - 0) + 0);
                    
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
                          "text": textos3[respuesta3]
                        }
                      ]
                    }
                    ];
                    const payload2 = [
                    {
                      "type": "chips",
                      "options": [
                        {
                          "text": "¿Que tipos de turismos tienes?"
                        }
                      ]
                    }
                    ];
                    dfMessenger.renderCustomCard(payload);
                    dfMessenger.renderCustomCard(payload1);
                    dfMessenger.renderCustomCard(payload2);
            }else{
              $dfMessenger.addEventListener('df-response-received', function (event) {
                  data = event.detail.response;
                  intento = data.queryResult.intent.displayName;
                  if (intento == "Default Welcome Intent") {
                    
                    var textos1 = new Array()
                    textos1[0] = "¿Necesitas ayuda?";
                    textos1[1] = "¡Hola! " + user;
                    respuesta1 = Math.floor(Math.random() * (textos1.length - 0) + 0);
                    var textos2 = new Array()
                    textos2[0] = "";
                    textos2[1] = "Me alegra saber que buscas mejorar tus experiencias con nuestros turismos";
                    respuesta2 = Math.floor(Math.random() * (textos2.length - 0) + 0);

                    
                    $dfMessenger.renderCustomText(textos1[respuesta1]);
                    $dfMessenger.renderCustomText("Soy el asistente de cogua");
                    $dfMessenger.renderCustomText(textos2[respuesta2]);
                    $dfMessenger.renderCustomText("Puedes preguntarme cualquier cosa o seleccionar algunas de las siguientes opciones.");
                    
                    var textos3 = new Array()
                    textos3[0] = "¿Que cabaña me recomiendas?";
                    textos3[1] = "¿Que plato típico me recomiendas?";
                    textos3[2] = "¿Que lugar turístico me recomiendas visitar?";
                    textos3[3] = "¿Que deporte me recomiendas reservar?";
                    respuesta3 = Math.floor(Math.random() * (textos3.length - 0) + 0);
                    
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
                          "text": textos3[respuesta3]
                        }
                      ]
                    }
                    ];
                    const payload2 = [
                    {
                      "type": "chips",
                      "options": [
                        {
                          "text": "¿Que tipos de turismos tienes?"
                        }
                      ]
                    }
                    ];
                    dfMessenger.renderCustomCard(payload);
                    dfMessenger.renderCustomCard(payload1);
                    dfMessenger.renderCustomCard(payload2);
                  }
              });
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
              $dfMessenger.renderCustomText('Buenos tardess ' + user);
              var textos2 = new Array()
              textos2[0] = "";
              textos2[1] = "Me alegra saber que buscas mejorar tus experiencias con nuestros turismos";
              respuesta2 = Math.floor(Math.random() * (textos2.length - 0) + 0);

              $dfMessenger.renderCustomText("Soy el asistente de cogua");
              $dfMessenger.renderCustomText(textos2[respuesta2]);
              $dfMessenger.renderCustomText("Puedes preguntarme cualquier cosa o seleccionar algunas de las siguientes opciones.");
              var textos3 = new Array()
              textos3[0] = "¿Que cabaña me recomiendas?";
              textos3[1] = "¿Que plato típico me recomiendas?";
              textos3[2] = "¿Que lugar turístico me recomiendas visitar?";
              textos3[3] = "¿Que deporte me recomiendas reservar?";
              respuesta3 = Math.floor(Math.random() * (textos3.length - 0) + 0);
              
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
                    "text": textos3[respuesta3]
                  }
                ]
              }
              ];
              const payload2 = [
              {
                "type": "chips",
                "options": [
                  {
                    "text": "¿Que tipos de turismos tienes?"
                  }
                ]
              }
              ];
              dfMessenger.renderCustomCard(payload);
              dfMessenger.renderCustomCard(payload1);
              dfMessenger.renderCustomCard(payload2);
            }else{
              $dfMessenger.addEventListener('df-response-received', function (event) {
                  data = event.detail.response;
                  intento = data.queryResult.intent.displayName;

                  if (intento == "Default Welcome Intent") {
                    var textos1 = new Array()
                    textos1[0] = "¿Necesitas ayuda?";
                    textos1[1] = "¡Hola! " + user;
                    respuesta1 = Math.floor(Math.random() * (textos1.length - 0) + 0);
                    var textos2 = new Array()
                    textos2[0] = "";
                    textos2[1] = "Me alegra saber que buscas mejorar tus experiencias con nuestros turismos";
                    respuesta2 = Math.floor(Math.random() * (textos2.length - 0) + 0);

                    $dfMessenger.renderCustomText(textos1[respuesta1]);
                    $dfMessenger.renderCustomText("Soy el asistente de cogua");
                    $dfMessenger.renderCustomText(textos2[respuesta2]);
                    $dfMessenger.renderCustomText("Puedes preguntarme cualquier cosa o seleccionar algunas de las siguientes opciones.");
                    var textos3 = new Array()
                    textos3[0] = "¿Que cabaña me recomiendas?";
                    textos3[1] = "¿Que plato típico me recomiendas?";
                    textos3[2] = "¿Que lugar turístico me recomiendas visitar?";
                    textos3[3] = "¿Que deporte me recomiendas reservar?";
                    respuesta3 = Math.floor(Math.random() * (textos3.length - 0) + 0);
                    
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
                          "text": textos3[respuesta3]
                        }
                      ]
                    }
                    ];
                    const payload2 = [
                    {
                      "type": "chips",
                      "options": [
                        {
                          "text": "¿Que tipos de turismos tienes?"
                        }
                      ]
                    }
                    ];
                    dfMessenger.renderCustomCard(payload);
                    dfMessenger.renderCustomCard(payload1);
                    dfMessenger.renderCustomCard(payload2);
                  }
              });
              
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
              var textos2 = new Array()
              textos2[0] = "";
              textos2[1] = "Me alegra saber que buscas mejorar tus experiencias con nuestros turismos";
              respuesta2 = Math.floor(Math.random() * (textos2.length - 0) + 0);

              $dfMessenger.renderCustomText("Soy el asistente de cogua");
              $dfMessenger.renderCustomText(textos2[respuesta2]);
              $dfMessenger.renderCustomText("Puedes preguntarme cualquier cosa o seleccionar algunas de las siguientes opciones.");
              var textos3 = new Array()
              textos3[0] = "¿Que cabaña me recomiendas?";
              textos3[1] = "¿Que plato típico me recomiendas?";
              textos3[2] = "¿Que lugar turístico me recomiendas visitar?";
              textos3[3] = "¿Que deporte me recomiendas reservar?";
              respuesta3 = Math.floor(Math.random() * (textos3.length - 0) + 0);
              
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
                    "text": textos3[respuesta3]
                  }
                ]
              }
              ];
              const payload2 = [
              {
                "type": "chips",
                "options": [
                  {
                    "text": "¿Que tipos de turismos tienes?"
                  }
                ]
              }
              ];
              dfMessenger.renderCustomCard(payload);
              dfMessenger.renderCustomCard(payload1);
              dfMessenger.renderCustomCard(payload2);
            }else{

              $dfMessenger.addEventListener('df-response-received', function (event) {
                  data = event.detail.response;
                  intento = data.queryResult.intent.displayName;
                  if (intento == "Default Welcome Intent") {
                    
                    var textos1 = new Array()
                    textos1[0] = "¿Necesitas ayuda?";
                    textos1[1] = "¡Hola! " + user;
                    respuesta1 = Math.floor(Math.random() * (textos1.length - 0) + 0);
                    var textos2 = new Array()
                    textos2[0] = "";
                    textos2[1] = "Me alegra saber que buscas mejorar tus experiencias con nuestros turismos";
                    respuesta2 = Math.floor(Math.random() * (textos2.length - 0) + 0);

                    $dfMessenger.renderCustomText(textos1[respuesta1]);
                    $dfMessenger.renderCustomText("Soy el asistente de cogua");
                    $dfMessenger.renderCustomText(textos2[respuesta2]);
                    $dfMessenger.renderCustomText("Puedes preguntarme cualquier cosa o seleccionar algunas de las siguientes opciones.");
                    var textos3 = new Array()
                    textos3[0] = "¿Que cabaña me recomiendas?";
                    textos3[1] = "¿Que plato típico me recomiendas?";
                    textos3[2] = "¿Que lugar turístico me recomiendas visitar?";
                    textos3[3] = "¿Que deporte me recomiendas reservar?";
                    respuesta3 = Math.floor(Math.random() * (textos3.length - 0) + 0);
                    
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
                          "text": textos3[respuesta3]
                        }
                      ]
                    }
                    ];
                    const payload2 = [
                    {
                      "type": "chips",
                      "options": [
                        {
                          "text": "¿Que tipos de turismos tienes?"
                        }
                      ]
                    }
                    ];
                    dfMessenger.renderCustomCard(payload);
                    dfMessenger.renderCustomCard(payload1);
                    dfMessenger.renderCustomCard(payload2);
                  }
              });
            }
          }
        }
        
    });
  }else{
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
  }
  

});