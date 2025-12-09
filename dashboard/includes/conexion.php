<?php
// Conexión a la base de datos MySQL
$servername = "localhost";
$username = "user_cabrera";
$password = "Evolucion1";
$dbname = "admin_cabrera";



$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}


function encrypt($string) {
    $key = "#clinicas8239978";
    $cipher = "aes-256-cbc";
    $iv_length = openssl_cipher_iv_length($cipher);
    $iv = openssl_random_pseudo_bytes($iv_length);

    $encrypted = openssl_encrypt($string, $cipher, $key, 0, $iv);

    return base64_encode($iv . $encrypted);
}

function decrypt($string) {
    $key = "#clinicas8239978";
    $cipher = "aes-256-cbc";
    $iv_length = openssl_cipher_iv_length($cipher);
    $data = base64_decode($string);
    $iv = substr($data, 0, $iv_length);
    $encrypted = substr($data, $iv_length);
    return openssl_decrypt($encrypted, $cipher, $key, 0, $iv);
}
?>