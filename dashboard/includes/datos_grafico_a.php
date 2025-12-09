<?php
header('Content-Type: application/json; charset=utf-8');
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';

//General
$fecha_actual = date('Y-m-d');


$seleccionClinica ="Madrid";
$seleccionFecha = "Siempre";
$seleccionRrss= "";
$seleccionClinica = $_POST["seleccionClinica"];
$seleccionFecha = $_POST["seleccionFecha"];
$seleccionRrss = $_POST["seleccionRrss"];

$fecha_desde="";
if($seleccionFecha=="Última semana"){
 //grafico 1
 $fecha_desde = date('Y-m-d', strtotime('-7 days'));
 //grafico 2
    //ahora
$fecha_ahora_inicio = date('Y-m-d', strtotime('-6 days'));
$fecha_ahora_final = date('Y-m-d');
// anterior
$fecha_anterior_inicio = date('Y-m-d', strtotime('-2 weeks +1days'));
$fecha_anterior_final = date('Y-m-d', strtotime('-1 week'));
    
} 
if($seleccionFecha=="Último mes"){
    //grafico 1
    $fecha_desde = date('Y-m-d', strtotime('-30 days'));  
    //grafico 2
    //ahora
    $fecha_ahora_inicio = date('Y-m-d', strtotime('-30 days'));
     $fecha_ahora_final = date('Y-m-d');
     // anterior
    $fecha_anterior_inicio = date('Y-m-d', strtotime('-60 days'));
    $fecha_anterior_final = date('Y-m-d', strtotime('-30 days'));
} 
if($seleccionFecha=="Último año" ){
    //grafico 1
     $fecha_desde = date('Y-m-d', strtotime('-365 days'));     
    //grafico 2
     //ahora
    $fecha_ahora_inicio = date('Y-m-d', strtotime('-364 days'));
     $fecha_ahora_final = date('Y-m-d');
     // anterior
    $fecha_anterior_inicio = date('Y-m-d', strtotime('-729 days'));
    $fecha_anterior_final = date('Y-m-d', strtotime('-365 days'));
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
if($seleccionFecha=="Siempre"){
$sql_fecha_mas_antigua = "SELECT MIN(fecha) AS fecha_mas_antigua FROM contacto";
$resultado_fecha_mas_antigua = $conn->query($sql_fecha_mas_antigua);
if ($resultado_fecha_mas_antigua === false) {
    die("Error al ejecutar la consulta: " . $conn->error);
}
// Obtener la fecha más antigua
$fila_fecha_mas_antigua = $resultado_fecha_mas_antigua->fetch_assoc();
$fecha_anterior_inicio = date('Y-m-d', strtotime($fila_fecha_mas_antigua['fecha_mas_antigua']));
// Calcular la fecha intermedia
$timestamp_fecha_mas_antigua = strtotime($fecha_anterior_inicio);
$timestamp_fecha_actual = time(); 

// Calcular la mitad de la diferencia de tiempo entre la fecha más antigua y la actual
$diff_tiempo = $timestamp_fecha_actual - $timestamp_fecha_mas_antigua;
$timestamp_fecha_intermedia = $timestamp_fecha_mas_antigua + ($diff_tiempo / 2);
// Convertir los timestamps a formato Y-m-d
$fecha_anterior_final = date('Y-m-d', $timestamp_fecha_intermedia- (24 * 60 * 60));
$fecha_ahora_inicio = date('Y-m-d', $timestamp_fecha_intermedia);  
$fecha_ahora_final = date('Y-m-d');
$diff_dias = strtotime($fecha_ahora_final) - strtotime($fecha_ahora_inicio);
$fecha_anterior_inicio = date('Y-m-d', strtotime($fecha_anterior_inicio) - $diff_dias);  
 
  $diff_dias_ahora = strtotime($fecha_ahora_final) - strtotime($fecha_ahora_inicio);
$diff_dias_anterior = strtotime($fecha_anterior_final) - strtotime($fecha_anterior_inicio);
$fecha_anterior_inicio = date('Y-m-d', strtotime($fecha_anterior_inicio) + ($diff_dias_anterior - $diff_dias_ahora));  
      
}

// Consulta SQL ahora
$sql_ahora = "SELECT clinica,tratamiento,DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM contacto WHERE fecha >= '$fecha_ahora_inicio 00:00:00' AND fecha <= '$fecha_ahora_final 23:59:59'".$consultaRrss;
// Consulta SQL anterior
 
$sql_anterior= "SELECT clinica,tratamiento,DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM contacto WHERE fecha >= '$fecha_anterior_inicio 00:00:00' AND fecha <= '$fecha_anterior_final 23:59:59'".$consultaRrss;




//Fechas vacias ahora
$fecha_inicio= strtotime($fecha_ahora_inicio);
$fecha_final= strtotime($fecha_ahora_final);
$datos_vacios_ahora = array();
while ($fecha_final >= $fecha_inicio) {
    $datos_vacios_ahora[date('Y-m-d', $fecha_final)] = "0";
    $fecha_final -= 86400; // Restamos un día (86400 segundos)
}
//Fechas vacias anterior
$fecha_inicio= strtotime($fecha_anterior_inicio);
$fecha_final= strtotime($fecha_anterior_final);
$datos_vacios_anterior = array();
while ($fecha_final >= $fecha_inicio) {
    $datos_vacios_anterior[date('Y-m-d', $fecha_final)] = "0";
    $fecha_final -= 86400; // Restamos un día (86400 segundos)
}


// Ejecutar las consultas SQL
$resultado_ahora = $conn->query($sql_ahora);
$resultado_anterior = $conn->query($sql_anterior);

// Verificar 
if ($resultado_anterior === false || $resultado_ahora === false) {
    die("Error al ejecutar las consultas: " . $conn->error);
}



// Resultados ahora
$datos_ahora = array();
$recorre = array();
// Obtener los resultados en un arreglo
while ($row = $resultado_ahora->fetch_assoc()) {
    
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

     if($tratamiento<>"" && ($seleccionClinica==$clinica_desencriptada || $seleccionClinica=="Todas las clínicas")){   
    if (isset( $datos_ahora[$row['fecha']])) {        
        // Si la clínica ya existe, incrementar el contador       
        $datos_ahora[$row['fecha']]++;
     } else {
        // Si la clínica no existe, agregarla al arreglo con contador 1
          $datos_ahora[$row['fecha']] = 1;
    }  
     }
 
}


// Resultados anterior
$datos_anterior = array();
// Obtener los resultados en un arreglo
while ($row = $resultado_anterior->fetch_assoc()) {
    
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
  

  if($tratamiento<>"" && ($seleccionClinica==$clinica_desencriptada || $seleccionClinica=="Todas las clínicas")){  
    if (isset( $datos_anterior[$row['fecha']])) {
        // Si la clínica ya existe, incrementar el contador       
        $datos_anterior[$row['fecha']]++;
     } else {
        // Si la clínica no existe, agregarla al arreglo con contador 1
          $datos_anterior[$row['fecha']] = 1;
    }  
     }
 
}

// Incluir fechas a 0 ahora

foreach ($datos_vacios_ahora as $fecha => $valor) {
    if (!array_key_exists($fecha, $datos_ahora)) {
        $datos_ahora[$fecha] = "0";
    }
}

// Incluir fechas a 0 anterior
foreach ($datos_vacios_anterior as $fecha => $valor) {
     if (!array_key_exists($fecha, $datos_anterior) ) {
     
        $datos_anterior[$fecha] = "0";
    }
}



// Ordenar array forma ascendente
ksort($datos_ahora);
ksort($datos_anterior);

$cantidad_fechas_ahora = count($datos_ahora);
$cantidad_fechas_anterior = count($datos_anterior);
//echo $cantidad_fechas_ahora."-".$cantidad_fechas_anterior;
$diferencia_cantidad_fechas = $cantidad_fechas_anterior - $cantidad_fechas_ahora;
if ($diferencia_cantidad_fechas > 0) {
    $fechas_eliminar = array_slice(array_keys($datos_anterior), 0, $diferencia_cantidad_fechas);
    foreach ($fechas_eliminar as $fecha) {
        unset($datos_anterior[$fecha]);
    }
}

// Combinar los resultados en un solo conjunto de datos
$datagrafico2 = array(
    'ahora' => $datos_ahora,
    'anterior' => $datos_anterior
);

// Devolver los datos como JSON
echo json_encode(array(
   'datagrafico1' => $datagrafico1,
    'datagrafico2' => $datagrafico2
));


$conn->close();
?>