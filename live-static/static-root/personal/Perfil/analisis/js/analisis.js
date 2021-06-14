var $ = jQuery.noConflict();
$(document).ready(function(){
	//Inicio - container-barras
	var csrftoken = getCookie('csrftoken'); 
	var year = (new Date()).getFullYear();
	var selectedReporte = document.getElementById("selectedReporte").value;
	var graficoColumnas = Highcharts.chart('container-barras', {
	    lang: {       
	        viewFullscreen:"Ver en pantalla completa",
	        exitFullscreen:"Salir de pantalla completa",
	        printChart:"Imprimir gráfico",
	        downloadPNG: "Descargar imagen en PNG",
	        downloadJPEG: "Descargar imagen en JPEG",
	        downloadPDF: "Descargar documento en PDF",
	        downloadSVG: "Descargar imagen vectorial svg",
	        downloadCSV:"Descargar CSV",
	        downloadXLS:"Descargar XLS",
	        viewData:"Ver tabla de datos",
	        hideData:"Ocultar tabla de datos"
	    },
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Reporte de reservas al año'
	    },
	    subtitle: {
	        text: 'Reporte de columnas'
	    },
	    xAxis: {
	        categories: [
	            'Enero',
	            'Febrero',
	            'Marzo',
	            'Abril',
	            'Mayo',
	            'Junio',
	            'Julio',
	            'Agosto',
	            'Septiembre',
	            'Octubre',
	            'Noviembre',
	            'Diciembre'
	        ],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Valores'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} total</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        }
	    },
	});
	$.ajax({
	  	data: {
	  		'year': year,
	  		'selectedReporte': selectedReporte,
	  		csrfmiddlewaretoken: csrftoken
	  	},
	  	url: '/perfil/barras_analisis_admin/reservas/',
	  	type: 'post',
	  	success: function(response){
	  		var seleccion = response.selected;
	  		if (seleccion == "general") {
				graficoColumnas.addSeries({
			        name: 'Cabañas',
			        data: response.hotel,
				});
				graficoColumnas.addSeries({
			        name: 'Deporte',
			        data: response.deporte,
				});
				graficoColumnas.addSeries({
			        name: 'Lugares Turísticos',
			        data: response.turismo,
				});
				graficoColumnas.addSeries({
			        name: 'Platos Típcos',
			        data: response.plato,
				});
	  		}
		},
		error: function(error){
			sweetError(error.responseJSON.mensaje);
		}
	  });
	//Fin - container-barras
	//Inicio - container-circular
	var graficoCircular = Highcharts.chart('container-circular', {
		lang: {       
	        viewFullscreen:"Ver en pantalla completa",
	        exitFullscreen:"Salir de pantalla completa",
	        printChart:"Imprimir gráfico",
	        downloadPNG: "Descargar imagen en PNG",
	        downloadJPEG: "Descargar imagen en JPEG",
	        downloadPDF: "Descargar documento en PDF",
	        downloadSVG: "Descargar imagen vectorial svg",
	        downloadCSV:"Descargar CSV",
	        downloadXLS:"Descargar XLS",
	        viewData:"Ver tabla de datos",
	        hideData:"Ocultar tabla de datos"
	    },
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'Porcentaje de reservas del mes actual'
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
	$.ajax({
		data:{
			'year': year,
			csrfmiddlewaretoken: csrftoken
		},
		url: '/perfil/circular_analisis_admin/reservas/',
		type: 'post',
		success: function(response){
			graficoCircular.addSeries({
				data: response.data,
		        name: 'Turismos',
		        colorByPoint: true,
		        
			});
		},
		error: function(error){
			console.log(error);
		}
	});
	//Fin - container-circular
});

function Selected()
  {
  /* Para obtener el valor */
  var csrftoken = getCookie('csrftoken'); 
  var year = document.getElementById("year").value;
  var selectedReporte = document.getElementById("selectedReporte").value;
  var graficoColumnas = Highcharts.chart('container-barras', {
  		lang: {       
	        viewFullscreen:"Ver en pantalla completa",
	        exitFullscreen:"Salir de pantalla completa",
	        printChart:"Imprimir gráfico",
	        downloadPNG: "Descargar imagen en PNG",
	        downloadJPEG: "Descargar imagen en JPEG",
	        downloadPDF: "Descargar documento en PDF",
	        downloadSVG: "Descargar imagen vectorial svg",
	        downloadCSV:"Descargar CSV",
	        downloadXLS:"Descargar XLS",
	        viewData:"Ver tabla de datos",
	        hideData:"Ocultar tabla de datos"
	    },
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Reporte de reservas al año'
	    },
	    subtitle: {
	        text: 'Reporte de columnas'
	    },
	    xAxis: {
	        categories: [
	            'Enero',
	            'Febrero',
	            'Marzo',
	            'Abril',
	            'Mayo',
	            'Junio',
	            'Julio',
	            'Agosto',
	            'Septiembre',
	            'Octubre',
	            'Noviembre',
	            'Diciembre'
	        ],
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: 'Valores'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} total</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        }
	    },
	});
  $.ajax({
  	data: {
  		'year': year,
  		'selectedReporte': selectedReporte,
  		csrfmiddlewaretoken: csrftoken
  	},
  	url: '/perfil/barras_analisis_admin/reservas/',
  	type: 'post',
  	success: function(response){
  		var seleccion = response.selected;
  		if (seleccion == "general") {
			graficoColumnas.addSeries({
		        name: 'Cabañas',
		        data: response.hotel,
			});
			graficoColumnas.addSeries({
		        name: 'Deporte',
		        data: response.deporte,
			});
			graficoColumnas.addSeries({
		        name: 'Lugares Turísticos',
		        data: response.turismo,
			});
			graficoColumnas.addSeries({
		        name: 'Platos Típcos',
		        data: response.plato,
			});

  		}else if (seleccion == "hotel") {
  			tempDiccionario = response.diccionario;
			tempHotel = response.hotel;
			for (let i = 0; i < response.hotel.length; i++) {
				graficoColumnas.addSeries({
			        name: tempHotel[i]['nombre'],
			        data: tempDiccionario[i],
				});
			}

  		}else if (seleccion == "deporte") {
  			tempDiccionario = response.diccionario;
			tempDeporte = response.deporte;
			for (let i = 0; i < response.deporte.length; i++) {
				graficoColumnas.addSeries({
			        name: tempDeporte[i]['nombre'],
			        data: tempDiccionario[i],
				});
			}

  		}else if (seleccion == "plato") {
  			tempDiccionario = response.diccionario;
			tempPlato = response.plato;
			for (let i = 0; i < response.plato.length; i++) {
				graficoColumnas.addSeries({
			        name: tempPlato[i]['nombre'],
			        data: tempDiccionario[i],
				});
			}

  		}else if (seleccion == "turismo") {
  			tempDiccionario = response.diccionario;
			tempTurismo = response.turismo;
			for (let i = 0; i < response.turismo.length; i++) {
				graficoColumnas.addSeries({
			        name: tempTurismo[i]['nombre'],
			        data: tempDiccionario[i],
				});
			}
  		}
  		
	},
	error: function(error){
		sweetError(error.responseJSON.mensaje);
	}
  });

}