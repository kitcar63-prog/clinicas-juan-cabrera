$(document).ready(function() {
    //General. Cambiar los selectores
     $('.dropdown').on('click', '.dropdown-item', function() {
    var textoSeleccionado = $(this).text().trim();
    $(this).closest('.dropdown').find('button').text(textoSeleccionado);
    const grafico= $(this).closest('.dropdown').parent().attr('class');  
  if (grafico === 'grafico1') {
            grafico1();			
   }   
   if (grafico === 'grafico2') {
            grafico2();
   } 
     if (grafico === 'grafico3') {
            grafico3();
   } 
         if (grafico === 'grafico4') {
            grafico4();
   } 
              if (grafico === 'grafico5') {
            grafico5();
   }     
  });
    
    // Función general
function obtener(data, campo) {
     var data = Object.values(data);
  return data.map(function(item) {
    return item[campo];
  });
}
    

  grafico1();
  function grafico1() {
   var seleccionClinica = $('#aclinicas').text().trim();  
    var seleccionFecha = $('#atiempo').text().trim();   
	var seleccionRrss = $('#arrss').text().trim();  

  $.ajax({
    url: 'includes/datos_grafico_a.php',
    type: 'POST',
    data: { seleccionClinica: seleccionClinica,seleccionFecha: seleccionFecha,seleccionRrss: seleccionRrss }, 
    dataType: 'json',
    success: function(response) {
        //grafico 1
  var datagrafico1 = response.datagrafico1;
         emailsPizzaClinicaConfig.labels = obtener(datagrafico1, 'ciudad');
         emailsPizzaClinicaConfig.series = obtener(datagrafico1, 'porcentaje_emails');
      var seleccion=seleccionClinica; 
 if(seleccion=="Todas las clínicas"){
     seleccion="Madrid";
 }
        const indice = emailsPizzaClinicaConfig.labels.indexOf(seleccion);
        const porcentaje = emailsPizzaClinicaConfig.series[indice]+"%";
         emailsPizzaClinicaConfig.plotOptions.pie.donut.labels.total.label = seleccion;
         emailsPizzaClinicaConfig.plotOptions.pie.donut.labels.total.formatter = function (w) {
        return porcentaje; 
    };
      
        const emailsPizzaClinicaFinal = new ApexCharts($('#emailsPizzaClinica')[0], emailsPizzaClinicaConfig);
        emailsPizzaClinicaFinal.render();
    // Forzar la actualización del gráfico
    emailsPizzaClinicaFinal.updateSeries(emailsPizzaClinicaConfig.series);
        
        //grafico 2
        var datagrafico2 = response.datagrafico2;
         const seriesAhora = [];
        const seriesAnterior = [];
        var totalemails=0;
           for (const fecha in datagrafico2.ahora) {
            if (datagrafico2.ahora.hasOwnProperty(fecha)) {
                seriesAhora.push(parseInt(datagrafico2.ahora[fecha]));
                totalemails=totalemails+parseInt(datagrafico2.ahora[fecha]);
            }
           }
        for (const fecha in datagrafico2.anterior) {
            if (datagrafico2.anterior.hasOwnProperty(fecha)) {
                seriesAnterior.push(parseInt(datagrafico2.anterior[fecha]));
                if(seleccionFecha=="Siempre"){
                totalemails=totalemails+parseInt(datagrafico2.anterior[fecha]);
                  }
            }
           }
        

     var totalemailsfinal='<h2 class="mb-2">'+totalemails+'</h2><span>Total emails '+seleccionClinica+'</span>';
        $('.graficoA .totalemails').html(totalemailsfinal);
        
        
        emailsLineaBarraComparativaConfig.series = [
            {
                name: 'Ahora',
                type: 'column',
                data: seriesAhora
            },
            {
                name: 'Antes',
                type: 'line',
                data: seriesAnterior
            }
        ];
        
const nombresMeses = {
  '01': 'Ene',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dic'
};

// Obtener las fechas del objeto de respuesta
const fechas = Object.keys(datagrafico2.ahora);
        
        
        

// Convertir las fechas al formato deseado ('d M')
const categorias = fechas.map(fecha => {
    const [year, month, day] = fecha.split('-');
    return `${parseInt(day)} ${nombresMeses[month]}`;
});
        
        emailsLineaBarraComparativaConfig.xaxis = {
    tickAmount: 10,
    categories: categorias
};
        
        

        // Renderizar el gráfico con las nuevas series
        const emailsLineaBarraComparativaFinal = new ApexCharts(emailsLineaBarraComparativa, emailsLineaBarraComparativaConfig);
    emailsLineaBarraComparativaFinal.render();
        // Forzar la actualización del gráfico
    emailsLineaBarraComparativaFinal.updateSeries(emailsLineaBarraComparativaConfig.series);
        
        
    },
    error: function(xhr, status, error) {
        console.log(xhr.responseText);
      console.error('Error al obtener los datos de la base de datos:', error);
    }
  });
  }
    
  //GRAFICO B 
  grafico2();
  function grafico2() {
   var seleccionClinica = $('#bclinicas').text().trim();  
    var seleccionFecha = $('#btiempo').text().trim();   
var seleccionRrss = $('#brrss').text().trim(); 
  $.ajax({
    url: 'includes/datos_grafico_b.php',
    type: 'POST',
    data: { seleccionClinica: seleccionClinica,seleccionFecha: seleccionFecha,seleccionRrss: seleccionRrss }, 
    dataType: 'json',
    success: function(response) {
        //grafico 1
  var datagrafico1 = response.datagrafico1;
         emailsPizzaTiposConfig.labels = obtener(datagrafico1, 'ciudad');
         emailsPizzaTiposConfig.series = obtener(datagrafico1, 'porcentaje_emails');
      var seleccion=seleccionClinica; 
 if(seleccion=="Todas las clínicas"){
     seleccion="Madrid";
 }
        const indice = emailsPizzaTiposConfig.labels.indexOf(seleccion);
        const porcentaje = emailsPizzaTiposConfig.series[indice]+"%";

  
      
        const emailsPizzaTiposFinal = new ApexCharts($('#emailsPizzaTipos')[0], emailsPizzaTiposConfig);
        emailsPizzaTiposFinal.render();
    // Forzar la actualización del gráfico
    emailsPizzaTiposFinal.updateSeries(emailsPizzaTiposConfig.series);
        
        //grafico 2
var datagrafico2 = response.datagrafico2;
var totalemails=0;
        
const formattedData = {};

// Iterar sobre los datos de datagrafico2
Object.keys(datagrafico2).forEach(tratamiento => {
    // Crear un array para almacenar los datos del tratamiento actual
    const tratamientoData = [];

    // Iterar sobre las fechas y los valores de cantidad_emails
    Object.entries(datagrafico2[tratamiento]).forEach(([fecha, info]) => {
        // Obtener la cantidad de emails para esta fecha
        const cantidad_emails = info.cantidad_emails;
 totalemails=totalemails+parseInt(cantidad_emails);
        // Agregar la cantidad de emails al array de datos del tratamiento actual
        tratamientoData.push(cantidad_emails);
        
    });

    // Agregar los datos del tratamiento actual al objeto de datos formateados
    formattedData[tratamiento] = tratamientoData;
});

      var totalemailsfinal='<h2 class="mb-2">'+totalemails+'</h2><span>Total emails '+seleccionClinica+'</span>';
        $('.graficoB .totalemails').html(totalemailsfinal);       
   
// Crear el objeto de configuración para el gráfico
emailsLineasTipoConfig.series = Object.entries(formattedData).map(([tratamiento, data]) => ({
    name: tratamiento,
    type: 'line',
    data: data
}));
  
const nombresMeses = {
  '01': 'Ene',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dic'
};

// Obtener las fechas del objeto de respuesta
const fechas = Object.keys(datagrafico2["Varices"]);        
       
        

// Convertir las fechas al formato deseado ('d M')
const categorias = fechas.map(fecha => {
    const [year, month, day] = fecha.split('-');
    return `${parseInt(day)} ${nombresMeses[month]}`;
});
  
        emailsLineasTipoConfig.xaxis = {
    tickAmount: 10,
    categories: categorias
};
        
       

const emailsLineasTipoFinal = new ApexCharts($('#emailsLineasTipo')[0], emailsLineasTipoConfig);
        emailsLineasTipoFinal.render();
    // Forzar la actualización del gráfico
    emailsLineasTipoFinal.updateSeries(emailsLineasTipoConfig.series);
        
     
        
        
    },
    error: function(xhr, status, error) {
        console.log(xhr.responseText);
      console.error('Error al obtener los datos de la base de datos:', error);
    }
  });
  }
    
    //GRAFICO C 
  grafico3();
  function grafico3() {
   var seleccionClinica = $('#cclinicas').text().trim();  
    var seleccionFecha = $('#ctiempo').text().trim();   
var seleccionRrss = $('#crrss').text().trim(); 
  $.ajax({
    url: 'includes/datos_grafico_c.php',
    type: 'POST',
    data: { seleccionClinica: seleccionClinica,seleccionFecha: seleccionFecha,seleccionRrss: seleccionRrss }, 
    dataType: 'json',
    success: function(response) {
       // Recibir los datos de la respuesta
        const data = response.datagrafico1;

 var n=0;
        // Configurar los valores para los gráficos radiales
      const colores = ['#5E72E4', '#69AE44', '#FD593D'];
        Object.keys(data).forEach(function(tipo) {
              const color = colores[n];
            n=n+1;
               $('.graficoc'+n).empty();
            const cantidad = data[tipo].cantidad;
            const porcentaje = data[tipo].porcentaje;
            // Configurar las opciones del gráfico
            const options = radialBarChartContacto(color, porcentaje, 'true');
            $('.tipoc'+n+' .mb-2').html(tipo);
            $('.tipoc'+n+' small').html(cantidad+' emails');
  
            const chart = new ApexCharts(document.querySelector('.graficoc'+n), options);
            chart.render();  
          
        });
    }, 
    error: function(xhr, status, error) {
        console.log(xhr.responseText);
      console.error('Error al obtener los datos de la base de datos:', error);
    }
  });
  }
    
 //GRAFICO D 
  grafico4();
  function grafico4() {
   var seleccionClinica = $('#dclinicas').text().trim();  
    var seleccionFecha = $('#dtiempo').text().trim();   
var seleccionRrss = $('#drrss').text().trim(); 
  $.ajax({
    url: 'includes/datos_grafico_d.php',
    type: 'POST',
    data: { seleccionClinica: seleccionClinica,seleccionFecha: seleccionFecha,seleccionRrss: seleccionRrss }, 
    dataType: 'json',
    success: function(response) {
       // Recibir los datos de la respuesta
        const data = response.datagrafico1;
 var n=0;
        // Configurar los valores para los gráficos radiales
         const colores = ['#5E72E4', '#69AE44', '#FD593D'];
        Object.keys(data).forEach(function(tipo) {
              const color = colores[n];
            n=n+1;
            $('.graficod'+n).empty();
               const cantidad = data[tipo].cantidad;
            const porcentaje = data[tipo].porcentaje;
            // Configurar las opciones del gráfico
            const options = radialBarChartContacto(color, porcentaje, 'true');
            $('.tipod'+n+' .mb-2').html(tipo);
            $('.tipod'+n+' small').html(cantidad+' emails');
            const chart = new ApexCharts(document.querySelector('.graficod'+n), options);
            chart.render();  
          
        });
    }, 
    error: function(xhr, status, error) {
        console.log(xhr.responseText);
      console.error('Error al obtener los datos de la base de datos:', error);
    }
  });
  } 
    
  //GRAFICO E 
  grafico5();
  function grafico5() {
   var seleccionTratamiento = $('#etratamientos').text().trim();  
    var seleccionFecha = $('#etiempo').text().trim();   
var seleccionRrss = $('#errss').text().trim(); 
  $.ajax({
    url: 'includes/datos_grafico_e.php',
    type: 'POST',
    data: { seleccionTratamiento: seleccionTratamiento,seleccionFecha: seleccionFecha,seleccionRrss: seleccionRrss }, 
    dataType: 'json',
    success: function(response) {
         $('#deliveryExceptionsChart').empty();
 
       // Recibir los datos de la respuesta
        const data = response.datagrafico1;

        if(data!=''){
 // Arrays para almacenar los datos procesados
    let labels = [];
    let series = [];

    // Recorrer el objeto data y extraer la información necesaria
    for (let city in data) {
        labels.push(`${city}: ${data[city].cantidad} emails`);
         series.push(data[city].porcentaje);
    }

    // Actualizar el gráfico con los nuevos valores
    deliveryExceptionsChartConfig.labels = labels;
    deliveryExceptionsChartConfig.series = series;


        
        const deliveryExceptionsChart = new ApexCharts($('#deliveryExceptionsChart')[0], deliveryExceptionsChartConfig);
    deliveryExceptionsChart.render();
        // deliveryExceptionsChart.updateSeries(deliveryExceptionsChartConfig);
        
        }
      
        
    }, 
    error: function(xhr, status, error) {
        console.log(xhr.responseText);
      console.error('Error al obtener los datos de la base de datos:', error);
    }
  });
  }   
     
  
 


    
});


