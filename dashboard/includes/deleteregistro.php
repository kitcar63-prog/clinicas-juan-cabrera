<?php
include $_SERVER['DOCUMENT_ROOT'] . '/dashboard/includes/conexion.php';

// Recibir los datos del formulario
$id = $_POST['id'];

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

$sql = "DELETE FROM contacto WHERE id = '$id'";

// Ejecutar la consulta SQL
if ($conn->query($sql) === TRUE) {
    echo "ok";
} else {
    echo "ko";
}

// Cerrar la conexión
$conn->close();
?>