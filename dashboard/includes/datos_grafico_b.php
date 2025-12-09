<?php
header('Content-Type: application/json; charset=utf-8');
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';

//General
$fecha_actual = date('Y-m-d');


$seleccionClinica ="Madrid";
$seleccionFecha = "Última semana";
$seleccionClinica = $_POST["seleccionClinica"];
$seleccionFecha = $_POST["seleccionFecha"];
$seleccionRrss = $_POST["seleccionRrss"];

$fecha_desde="";
if($seleccionFecha=="Última semana"){
 $fecha_desde = date('Y-m-d', strtotime('-6 days'));
    
} 
if($seleccionFecha=="Último mes"){
    $fecha_desde = date('Y-m-d', strtotime('-30 days'));     
} 
if($seleccionFecha=="Último año"){   
     $fecha_desde = date('Y-m-d', strtotime('-365 days'));     
} 

if($seleccionFecha=="Siempre"){
$sql_fecha_mas_antigua = "SELECT MIN(fecha) AS fecha_mas_antigua FROM contacto";
$resultado_fecha_mas_antigua = $conn->query($sql_fecha_mas_antigua);
$fila_fecha_mas_antigua = $resultado_fecha_mas_antigua->fetch_assoc();
$fecha_desde = date('Y-m-d', strtotime($fila_fecha_mas_antigua['fecha_mas_antigua']));      
}

if($seleccionRrss=="No"){
	$consultaRrss=" AND contacto<>'Si'";
}
if($seleccionRrss=="Si"){
	$consultaRrss=" AND contacto='Si'";
}
if($seleccionRrss<>"Si" && $seleccionRrss<>"No"){
	$consultaRrss="";
}




//GRAFICO A.1
$sql = "SELECT clinica,tratamiento FROM contacto WHERE fecha >= '$fecha_desde 00:00:00' AND fecha <= '$fecha_actual 23:59:59' ".$consultaRrss;
$result = $conn->query($sql);

// Verificar si la consulta fue exitosa
if ($result === false) {
    die("Error al ejecutar la consulta: " . $conn->error);
}

// Array para almacenar los datos agrupados
$datagrafico1 = array();
$total_emails = 0;

// Obtener los resultados en un arreglo
while ($row = $result->fetch_assoc()) {
    // Desencriptar el campo 'clinica'
    $clinica=decrypt($row['clinica']);
    if (strpos($clinica, "Coru") !== false) {
        $clinica="Coruña";
    }
    $clinica_desencriptada = $clinica;

$tratamiento=decrypt($row['tratamiento']);
 if($clinica_desencriptada<>"" && $tratamiento<>""){
      $total_emails++;
    if (array_key_exists($clinica_desencriptada, $datagrafico1)) {
        // Si la clínica ya existe, incrementar el contador
        $datagrafico1[$clinica_desencriptada]['cantidad_emails']++;
       if($seleccionClinica==$clinica_desencriptada || $seleccionClinica=="Todas las clínicas"){
        $datagrafico1[$clinica_desencriptada]['cantidad_emails_clinica']++;
       }
    } else {
        // Si la clínica no existe, agregarla al arreglo con contador 1
        $datagrafico1[$clinica_desencriptada] = array(
            'ciudad' => $clinica_desencriptada,
            'cantidad_emails' => 1,
            'cantidad_emails_clinica' =>0
        ); 
    }
  }
}
foreach ($datagrafico1 as &$ciudad) {
    $ciudad['porcentaje_emails'] = round(($ciudad['cantidad_emails'] / $total_emails) * 100);
}

//GRAFICO A.2


$sql = "SELECT clinica,tratamiento,DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM contacto WHERE fecha >= '$fecha_desde 00:00:00' AND fecha <= '$fecha_actual 23:59:59'".$consultaRrss;
$result = $conn->query($sql);

// Verificar si la consulta fue exitosa
if ($result === false) {
    die("Error al ejecutar la consulta: " . $conn->error);
}

// Array para almacenar los datos agrupados
$datagrafico2 = array();


// Obtener los resultados en un arreglo
while ($row = $result->fetch_assoc()) {
    
    // Desencriptar el campo 'clinica'
    $clinica=decrypt($row['clinica']);
    if (strpos($clinica, "Coru") !== false) {
        $clinica="Coruña";
    }
    $clinica_desencriptada = $clinica;
   $tratamiento=decrypt($row['tratamiento']);
  if (strpos($tratamiento, 'Varicosa') !== false) {
        $tratamiento="Úlcera Varicosa";
    }
     if ($tratamiento=="") {
        $tratamiento="Varices";
    } 
    $tratamientook=['Úlcera Varicosa','Varices','Hemorroides'];
     $fecha=$row['fecha'];

  if($tratamiento<>"" && ($seleccionClinica==$clinica_desencriptada || $seleccionClinica=="Todas las clínicas")){     
    if (isset($datagrafico2[$tratamiento][$fecha])) {  
        // Si la clínica ya existe, incrementar el contador       
         $datagrafico2[$tratamiento][$fecha]['cantidad_emails']++;
   
    } else {
        // Si la clínica no existe, agregarla al arreglo con contador 1
         $datagrafico2[$tratamiento][$fecha] = array(
            'cantidad_emails' => 1
        ); 
    }
  }
 
}

if($seleccionFecha=="Siempre"){
$sql_fecha_mas_antigua = "SELECT MIN(fecha) AS fecha_mas_antigua FROM contacto";
$resultado_fecha_mas_antigua = $conn->query($sql_fecha_mas_antigua);
if ($resultado_fecha_mas_antigua === false) {
    die("Error al ejecutar la consulta: " . $conn->error);
}
// Obtener la fecha más antigua
$fila_fecha_mas_antigua = $resultado_fecha_mas_antigua->fetch_assoc();
$fecha_desde = date('Y-m-d', strtotime($fila_fecha_mas_antigua['fecha_mas_antigua']));
}
//Fechas vacias ahora

$fecha_inicio = strtotime($fecha_desde);
$fecha_final = strtotime($fecha_actual);
$datos_vacios = array();

// Iterar sobre cada fecha en el rango
while ($fecha_final >= $fecha_inicio) {
    // Iterar sobre cada tratamiento y agregarlo al arreglo
    foreach ($tratamientook as $tratamiento) {
        // Crear un arreglo para cada tratamiento en la fecha actual con cantidad_emails igual a 0
        $datos_vacios[$tratamiento][date('Y-m-d', $fecha_final)] = "0";
    }
    $fecha_final -= 86400; // Restar un día a la fecha final
}

foreach ($datos_vacios as $tratamiento => $fechas) {
    foreach ($fechas as $fecha => $valor) {
        // Verificar si la fecha no está presente en $datagrafico2 para el tratamiento actual
        if (!isset($datagrafico2[$tratamiento][$fecha])) {
            // Si no está presente, agregar la fecha con cantidad_emails igual a 0
            $datagrafico2[$tratamiento][$fecha]['cantidad_emails'] = 0;
        }
    }
}
foreach ($datagrafico2 as &$tratamiento) {
    ksort($tratamiento);
}
unset($tratamiento); // Liberar la referencia después del bucle foreach


// Devolver los datos como JSON
echo json_encode(array(
 'datagrafico1' => $datagrafico1,
   'datagrafico2' => $datagrafico2
));


$conn->close();
?>