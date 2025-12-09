<?php
header('Content-Type: application/json; charset=utf-8');
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';

//General
$fecha_actual = date('Y-m-d');


$seleccionClinica ="Todas";
$seleccionFecha = "Siempre";
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
$sql = "SELECT clinica,tratamiento,franja_horaria FROM contacto WHERE fecha >= '$fecha_desde 00:00:00' AND fecha <= '$fecha_actual 23:59:59' ".$consultaRrss;
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
       $franja=decrypt($row['franja_horaria']);
    if($franja==""){
        $franja="Cualquiera";
    }
    
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
     
     if($tratamiento<>"" && $franja<>"" && ($seleccionClinica==$clinica || $seleccionClinica=="Todas")){      
    if (isset( $datagrafico1[$franja])) {        
       $datagrafico1[$franja]++;
     } else {
        // Si la clínica no existe, agregarla al arreglo con contador 1
         $datagrafico1[$franja] = 1;
    }  
     }
 
}
$total_correos = array_sum($datagrafico1);
$datagrafico1_con_porcentajes = array();
foreach ($datagrafico1 as $tipo => $cantidad) {
    $porcentaje = ($cantidad / $total_correos) * 100;
    $datagrafico1_con_porcentajes[$tipo] = array(
        "cantidad" => $cantidad,
        "porcentaje" => round($porcentaje) // Redondear el porcentaje a dos decimales
    );
}

ksort($datagrafico1_con_porcentajes);


// Devolver los datos como JSON
echo json_encode(array(
 'datagrafico1' => $datagrafico1_con_porcentajes
));


$conn->close();
?>