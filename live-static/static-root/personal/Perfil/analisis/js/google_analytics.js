var $tbody;
var $status;
var intl = false;

$(document).ready(function() {
  //Highcharts de sesiones vs ussuarios
  var userSessions = Highcharts.chart('container-usuarios-sesiones', {
      chart: {
          type: 'areaspline'
      },
      title: {
          text: 'Sesiones vs Usuarios - Ultimos 30 días'
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
      xAxis: {
          categories: [],
      },
      yAxis: {
          title: {
              text: 'Cantidad de visitas'
          }
      },
      tooltip: {
          shared: true,
          valueSuffix: ' Total'
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      }
  });

  //Highcharts de paginas mas vistas
  var paginas = Highcharts.chart('container-paginas-visitas', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Paginas con mayores visitas - Ultimos 30 dias'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
  });
  
  //Highcharts de ciudades con mayor porcentaje de vista
  /*var ciudad = Highcharts.chart('container-ciudad', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Porcentaje de visitas por ciudad'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
  });*/

  if(window.Intl) intl = true;
  
  $tbody = $("#dataTable tbody");
  $status = $("#status");
  $status.html("<i>Porfavor espera - los datos estan cargando...</i>");
  
  gapi.analytics.ready(function() {
    gapi.analytics.auth.authorize({
      container: 'embed-api-auth-container',
      clientid: '659773364914-iolkrc4qccmn8mtcacaakje8p6jcgksd.apps.googleusercontent.com',
      userInfoLabel:"Cogua: "
    });
    gapi.analytics.auth.on('success', function(response) {
      //hide the embed-api-auth-container
      document.querySelector("#embed-api-auth-container").style.display='none';

      //sesiones vs ussuarios
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:242342842',
        'metrics': 'ga:sessions,ga:users',
        'start-date': '30daysAgo',
        'end-date': 'today',
        'dimensions':'ga:date'
      }).execute(function(results) {
        $status.html("");
        $('#container-usuarios-sesiones').show();
        var temp = results.rows;
        var arrayData = [];
        var arrayData1 = []
        for(var i = 0; i<temp.length; i++){
          $status.html("");
          userSessions.xAxis[0].categories.push(formatDate(temp[i][0]))
          arrayData.push(parseInt(temp[i][1]));
          arrayData1.push(parseInt(temp[i][2]));
        }
        
        userSessions.addSeries({
          name: 'Sesiones',
          data: arrayData

        });
        userSessions.addSeries({
          name: 'Usuarios',
          data: arrayData1

        });
      });

      //porcentaje de visitas en las paginas
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:242342842',
        'metrics': 'ga:pageviews',
        'start-date': '30daysAgo',
        'end-date': 'today',
        'dimensions':'ga:pagePathLevel1'
      }).execute(function(results) {
        $status.html("");
        $('#container-paginas-visitas').show();
        paginas.addSeries({
          data: renderDatosPag(results.rows),
          name: 'Porcentaje',
          colorByPoint: true,
        });
      });

      //porcentaje de visitas por ciudad
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:242342842',
        'dimensions': 'ga:city',
        'metrics': 'ga:sessions',
        'start-date': '30daysAgo',
        'end-date': 'today',
      }).execute(function(results) {
        $('#container-ciudad').show();
        ciudad.addSeries({
          data: renderDatosCiudad(results.rows),
          name: 'Porcentaje',
          colorByPoint: true,
        });
      });

      //ver el numero de ussuarios conectados en neustra pagina -> todavia en prueba
      //gapi.client.analytics.data.realtime.get({
       // 'ids': 'ga:242342842',
          //metrics: 'rt:activeUsers'
      //}).execute(function(results) {
       // console.log(results)
      //});
    
  
    });
  
  });
  
});
function formatDate(str) {
  var year = str.substring(0,4);
  var month = str.substring(4,6);
  var day = str.substring(6,8);

  let dias = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  var fechaValida = new Date(year,month-1,day);
  var dia = fechaValida.getDay();
  var mes = fechaValida.getMonth();
  return meses[mes] + ', ' + dias[dia] + ' ' + day;
}

function renderDatosPag(temp) {
  var data = [];
  for(var i=0;i<temp.length;i++) {
    var valores = temp[i][1];
    if (temp[i][0] == "/") {
      data.push({
          name:   "home",
          y: parseInt(valores)
      });
    }else if (temp[i][0] == "/perfil/") {
      data.push({
          name:   "Perfil de usuario",
          y: parseInt(valores)
      });
    }else if (temp[i][0] == "/listado-cabañas-disponibles/") {
      data.push({
          name:   "Página de cabañas",
          y: parseInt(valores)
      });
    }else if (temp[i][0] == "/listado-deportes-disponibles/") {
      data.push({
          name:   "Página de deportes",
          y: parseInt(valores)
      });
    }else if (temp[i][0] == "/listado-lugares-turisticos-disponibles/") {
      data.push({
          name:   "Página de lugares tuísticos",
          y: parseInt(valores)
      });
    }else if (temp[i][0] == "/listado-platos-tipicos-disponibles/") {
      data.push({
          name:   "Página de platos típicos",
          y: parseInt(valores)
      });
    }
  }
  return data
}
function renderDatosCiudad(temp) {
  var data = [];
  for(var i=0;i<temp.length;i++) {
    var valores = temp[i][1];
    if (temp[i][0] == "(not set)") {
      data.push({
          name:   "Sin enlace",
          y: parseInt(valores)
      });
    }else{
      data.push({
        name:   temp[i][0],
        y: parseInt(valores)
    });
    }
    

  }
  return data
}