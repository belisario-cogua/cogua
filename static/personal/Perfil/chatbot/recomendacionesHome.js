/*$(document).ready(function(){                 

        var nombre = sessionStorage.getItem("Nombre");
        var apellido = sessionStorage.getItem("Apellido");
   
        console.log("nombre de sessionStorage")   
        console.log(nombre);
        console.log("apellido de sessionStorage")   
        console.log(apellido);

        if (nombre == "homeReservaDeporte") {
            window.addEventListener('dfMessengerLoaded', function (event) {
                dfMessenger = document.querySelector("df-messenger");
                dfMessenger.renderCustomText('Gracias por tu reserva del deporte. Deberías tambien reservar un almuerzo, te recomiendo estos platos típicos');
            });
        } 
        else if (nombre == "homeReservaHotel") {
            window.addEventListener('dfMessengerLoaded', function (event) {
                dfMessenger = document.querySelector("df-messenger");
                dfMessenger.renderCustomText('Gracias por tu reserva, disfruta tu instancia en nuestra cabaña. Deberías tambien reservar un almuerzo, te recomiendo estos platos típicos');
            });
        }
        else if (nombre == "homeReservaPlato") {
            window.addEventListener('dfMessengerLoaded', function (event) {
                dfMessenger = document.querySelector("df-messenger");
                dfMessenger.renderCustomText('Gracias por tu reserva, disfruta de nuestra cocina. de paso te recomiendo estos deportes');
            });
        }
        else if (nombre == "homeReservaTurismo") {
            window.addEventListener('dfMessengerLoaded', function (event) {
                dfMessenger = document.querySelector("df-messenger");
                dfMessenger.renderCustomText('Buena suerte en tu viaje. Podria recomendarte reservar un transporte, como esta bicicleta talvez');
            });
        }

});

*/