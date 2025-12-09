<?php
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';


$idreg = $_POST['idreg'];

function formatDate($date) {
    $dateTime = new DateTime($date);
    return $dateTime->format('d/m/Y');
}


$sql = "SELECT email_usuario, email_destino, nombre, apellido, telefono, tratamiento, clinica, contactar_por, franja_horaria, asunto, tumensaje, fecha, contacto FROM contacto WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idreg);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
	 $row['email_usuario'] = decrypt($row['email_usuario']);
    $row['email_destino'] = decrypt($row['email_destino']);
    $row['nombre'] = decrypt($row['nombre']);
    $row['apellido'] = decrypt($row['apellido']);
    $row['telefono'] = decrypt($row['telefono']);
    $row['tratamiento'] = decrypt($row['tratamiento']);
    $row['clinica'] = decrypt($row['clinica']);
    $row['contactar_por'] = decrypt($row['contactar_por']);
    $row['franja_horaria'] = decrypt($row['franja_horaria']);
    $row['asunto'] = decrypt($row['asunto']);
    $row['tumensaje'] = decrypt($row['tumensaje']);
	 $row['fecha'] = formatDate($row['fecha']);
    echo json_encode($row);
} else {
    echo json_encode(array("error" => "No se encontró el registro"));
}

$stmt->close();
$conn->close();

?>
