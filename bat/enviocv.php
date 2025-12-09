<?php
$recipients = 'maqmanu1@gmail.com';

try {
    require './phpmailer/PHPMailerAutoload.php';

    // Validar las direcciones de correo
    preg_match_all("/([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/", $recipients, $addresses, PREG_OFFSET_CAPTURE);

    if (!count($addresses[0])) {
        die('MF001');
    }

    if (preg_match('/^(127\.|192\.168\.)/', $_SERVER['REMOTE_ADDR'])) {
        die('MF002');
    }

    // Cargar la plantilla
    $template = file_get_contents('rd-mailform.tpl');

    // Asignar el asunto
    $subject = 'Envío CV desde la web clinicasdoctorjuancabrera.com';

    // Reemplazar el estado y email
    if (isset($_POST['email'])) {
        $template = str_replace(
            ["<!-- #{FromState} -->", "<!-- #{FromEmail} -->"],
            ["Email:", $_POST['email']],
            $template);
    } else {
        die('MF003');
    }

    // Reemplazar la información del formulario en la plantilla
    preg_match("/(<!-- #{BeginInfo} -->)(.|\n)+(<!-- #{EndInfo} -->)/", $template, $tmp, PREG_OFFSET_CAPTURE);
    foreach ($_POST as $key => $value) {
        if ($key != "email" && $key != "form-type" && !empty($value)) {
            $info = str_replace(
                ["<!-- #{BeginInfo} -->", "<!-- #{InfoState} -->", "<!-- #{InfoDescription} -->"],
                ["", ucfirst($key) . ':', $value],
                $tmp[0][0]);

            $template = str_replace("<!-- #{EndInfo} -->", $info, $template);
        }
    }

    // Reemplazar el asunto y nombre del sitio
    $template = str_replace(
        ["<!-- #{Subject} -->", "<!-- #{SiteName} -->"],
        [$subject, $_SERVER['SERVER_NAME']],
        $template);

    // Configuración del correo
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "tls";
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 587;
    $mail->Username = "drjuancabreraenvios@gmail.com";
    $mail->Password = "xhzyechiqqjsybxc";
    $mail->From = $_SERVER['SERVER_ADDR'];
    $mail->FromName = $_SERVER['SERVER_NAME'];
	$mail->AddBCC('maqdevelopment.com@gmail.com', 'copia oculta');

    // Añadir direcciones de los destinatarios
    foreach ($addresses[0] as $key => $value) {
        $mail->addAddress($value[0]);
    }

    $mail->CharSet = 'utf-8';
    $mail->Subject = $subject;
    $mail->MsgHTML($template);

    // Procesar la carga de archivos
    if (isset($_FILES['archivo'])) {
        if ($_FILES['archivo']['error'] == UPLOAD_ERR_OK) {
            $mail->AddAttachment($_FILES['archivo']['tmp_name'], $_FILES['archivo']['name']);
        }
    }

    // Validación y envío
    if (!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['telefono'])) {
        $mail->send();
        die('MF000');
    }
} catch (phpmailerException $e) {
    die('MF254');
} catch (Exception $e) {
    die('MF255');
}
?>
