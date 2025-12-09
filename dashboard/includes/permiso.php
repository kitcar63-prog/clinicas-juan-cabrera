<?php
session_start();
// Verificar si el usuario está autenticado
if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    header("Location: /dashboard/index.php");
    exit;
}
?>