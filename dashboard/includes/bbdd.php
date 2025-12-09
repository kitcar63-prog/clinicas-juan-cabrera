<?php
header('Content-Type: application/json; charset=utf-8');
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';

$sql = "SELECT Id,clinica,tratamiento,franja_horaria,contactar_por,fecha,contacto,asunto,tumensaje FROM contacto ORDER BY fecha desc";
$result = $conn->query($sql);

// Verificar si la consulta fue exitosa
if ($result === false) {
    die("Error al ejecutar la consulta: " . $conn->error);
}

// Array para almacenar los datos agrupados
$databbdd = array();

// Obtener los resultados en un arreglo
while ($row = $result->fetch_assoc()) {
   $tratamiento=utf8_encode(decrypt($row['tratamiento']));
    if (strpos($tratamiento, "Varicosa") !== false) {
        $tratamiento="Úlcera Varicosa";
    }
    if($tratamiento==""){
        $tratamiento="-";
    }
     $clinica=utf8_encode(decrypt($row['clinica']));
    if (strpos($clinica, "Coru") !== false) {
        $clinica="Coruña";
    }
     if($clinica==""){
        $clinica="-";
    }
    $contactar=utf8_encode(decrypt($row['contactar_por']));
    if($contactar==""){
        $contactar="-";
    }
    $franja=utf8_encode(decrypt($row['franja_horaria']));
    if($franja==""){
        $franja="-";
    }
   $fecha_mysql = $row['fecha'];
$fecha_espanol = date("d/m/Y", strtotime($fecha_mysql));

 $contacto= $row['contacto'];
 if($contacto==""){
	 $contacto="No";
 }
	  $asunto = utf8_encode(decrypt($row['asunto']));
    if($asunto==""){
        $asunto="-";
    }
$tumensaje = utf8_encode(decrypt($row['tumensaje']));
    if($tumensaje==""){
        $tumensaje="-";
    }
    $item = array(
        "id" => $row['Id'],
        "clinica" => $clinica,
        "tratamiento" => $tratamiento,
        "contactar" => $contactar,
        "franja" => $franja,
        "fecha" =>$fecha_espanol,
		"contacto" =>$contacto,
		"accion" =>"",
	"asunto" =>$asunto,
		"tumensaje" =>$tumensaje
    );
  
    // Agregar el array generado al array principal
    $databbdd[] = $item;
}


  
$data = array(
    "data" => $databbdd
);

// Convertir el array a formato JSON
$json_output = json_encode($data, JSON_UNESCAPED_UNICODE);

if ($json_output === false) {
    // Mostrar el error si la codificación falla
    echo "Error al codificar JSON: " . json_last_error_msg();
} else {
    // Imprimir el JSON resultante
    echo $json_output;
}


$conn->close();
?>