<?php
$host="localhost";
$usuario="user_cabrera"; 
$password="Evolucion1";
$db="admin_cabrera"; 
$conexion = mysqli_connect($host,$usuario,$password,$db);
mysqli_set_charset($conexion, 'utf8');

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
$fecha_actual = date("Y-m-d H:i:s");
$email_usuario=encrypt($_POST['email']);
$email_destino=encrypt($recipients);
$asunto=encrypt($subject);
$mensaje=encrypt($template);
 


foreach ($_POST as $key => $value) {
    if (!empty($value)) {
        switch ($key) {
            case 'nombre':
                $nombre = encrypt($value);
                break;
            case 'apellido':
                $apellido = encrypt($value);
                break;
            case 'telefono':
                $telefono = encrypt($value);
                break;
            case 'tipotratamiento':
                $tipo = encrypt($value);
                break;
            case 'clinica':
                $clinica = encrypt($value);
                break;
            case 'contactopor':
                $contactarpor = encrypt($value);
                break;
            case 'franja':
                $franjahoraria = encrypt($value);
                break;
            case 'mensaje':
                $tumensaje = encrypt($value);
                break;
        }
    }
}
    
    
$sql = "INSERT INTO contacto (email_usuario,email_destino,asunto,nombre,apellido,telefono,tratamiento,clinica,contactar_por,franja_horaria,fecha,tumensaje,mensaje) VALUES ('".$email_usuario."','".$email_destino."','".$asunto."','".$nombre."','".$apellido."','".$telefono."','".$tipo."','".$clinica."','".$contactarpor."','".$franjahoraria."','".$fecha_actual."','".$tumensaje."','".$mensaje."')";
$resultado = mysqli_query($conexion, $sql);
mysqli_close($conexion);
?>