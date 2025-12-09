<?php
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';


$idreg = $_POST['idreg'];
// Recibir los datos del formulario
$email_usuario = encrypt($_POST['email_usuario']);
$email_destino = encrypt($_POST['email_destino']);
$nombre = encrypt($_POST['nombre']);
$apellido = encrypt($_POST['apellido']);
$telefono = encrypt($_POST['telefono']);
$tratamiento = encrypt($_POST['tratamiento']);
$clinica = encrypt($_POST['clinica']);
$contactar_por = encrypt($_POST['contactar_por']);
$franja_horaria = encrypt($_POST['franja_horaria']);
$tumensaje = encrypt($_POST['tumensaje']);
$asunto = encrypt($_POST['asunto']);
$fecha = $_POST['fecha'];
$fecha = DateTime::createFromFormat('d/m/Y', $fecha)->format('Y-m-d');
$contacto = $_POST['contacto'];



// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

if($idreg==""){
// Preparar la consulta SQL para insertar los datos en la base de datos
$sql = "INSERT INTO contacto (email_usuario, email_destino, nombre, apellido, telefono,tratamiento, clinica, contactar_por, franja_horaria, asunto,tumensaje, fecha,contacto)
        VALUES ('$email_usuario', '$email_destino', '$nombre', '$apellido', '$telefono', '$tratamiento','$clinica', '$contactar_por', '$franja_horaria', '$asunto','$tumensaje', '$fecha', '$contacto')";
}else{
	//Actualizar registro
	$sql = "UPDATE contacto SET 
        email_usuario = '$email_usuario', 
        email_destino = '$email_destino', 
        nombre = '$nombre', 
        apellido = '$apellido', 
        telefono = '$telefono', 
        tratamiento = '$tratamiento', 
        clinica = '$clinica', 
        contactar_por = '$contactar_por', 
        franja_horaria = '$franja_horaria', 
        asunto = '$asunto', 
        tumensaje = '$tumensaje', 
        fecha = '$fecha', 
        contacto = '$contacto'
        WHERE id = $idreg";
	
}

// Ejecutar la consulta SQL
if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "ko";
}

// Cerrar la conexión
$conn->close();
?>
