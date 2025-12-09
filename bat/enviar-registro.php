<?php
//$recipients = 'socialmedia@drjuancabrera.com';
$recipients = 'maqmanu1@gmail.com';
//$recipients = '#';

try {
    require './phpmailer/PHPMailerAutoload.php';

    preg_match_all("/([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)/", $recipients, $addresses, PREG_OFFSET_CAPTURE);

    if (!count($addresses[0])) {
        die('MF001');
    }

    if (preg_match('/^(127\.|192\.168\.)/', $_SERVER['REMOTE_ADDR'])) {
        die('MF002');
    }

    $template = file_get_contents('rd-mailform.tpl');

    if (isset($_POST['form-type'])) {
        switch ($_POST['form-type']){
            case 'contact':
                $subject = 'Registro formulario Linkedin desde la web clinicasdoctorjuancabrera.com';
                break;         
        }
    }else{
        die('MF004');
    }

    if (isset($_POST['email'])) {
        $template = str_replace(
            ["<!-- #{FromState} -->", "<!-- #{FromEmail} -->"],
            ["Email:", $_POST['email']],
            $template);
    }else{
        die('MF003');
    }



    preg_match("/(<!-- #{BeginInfo} -->)(.|\n)+(<!-- #{EndInfo} -->)/", $template, $tmp, PREG_OFFSET_CAPTURE);
    foreach ($_POST as $key => $value) {
       if ($key != "email"  && $key != "message" && $key != "form-type" && !empty($value)){
            $info = str_replace(
                ["<!-- #{BeginInfo} -->", "<!-- #{InfoState} -->", "<!-- #{InfoDescription} -->"],
                ["", ucfirst($key) . ':', $value],
                $tmp[0][0]);

            $template = str_replace("<!-- #{EndInfo} -->", $info, $template);
        }
    }

    $template = str_replace(
        ["<!-- #{Subject} -->", "<!-- #{SiteName} -->"],
        [$subject, $_SERVER['SERVER_NAME']],
        $template);

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
//$mail->AddBCC('esther@masquemarketingonline.com', 'copia oculta');
//$mail->AddBCC('clara@diswag.com', 'copia aculta');
//$mail->AddBCC('maqmanu1@gmail.com', 'copia aculta');



    foreach ($addresses[0] as $key => $value) {
        $mail->addAddress($value[0]);
    }

    $mail->CharSet = 'utf-8';
    $mail->Subject = $subject;
    $mail->MsgHTML($template);

    // Verificar si se ha subido un archivo
    if (isset($_FILES['adjunto'])) {
        if ($_FILES['adjunto']['error'] == UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['adjunto']['tmp_name'];
            $fileName = $_FILES['adjunto']['name'];
            $fileSize = $_FILES['adjunto']['size'];
            $fileType = $_FILES['adjunto']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            // Comprobar que el archivo es un PDF
            $allowedfileExtensions = array('pdf');
            if (in_array($fileExtension, $allowedfileExtensions)) {
                // Aquí es donde agregarás el archivo como un adjunto en el correo
                $mail->AddAttachment($fileTmpPath, $fileName);
            } else {
                die('Solo se permiten archivos PDF.');
            }
        } else {
            die('Hubo un error al subir el archivo.');
        }
    } else {
        die('No se ha subido ningún archivo.');
    }
if($_POST['nombre']!="" && $_POST['email']!="" && $_POST['telefono']!="" && $_POST['apellido']!=""){
    $mail->send();
	//include 'guardarcontacto.php';
    die('MF000');	
}
} catch (phpmailerException $e) {
    die('MF254');
} catch (Exception $e) {
    die('MF255');
}

?>