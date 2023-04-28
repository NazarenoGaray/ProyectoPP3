<?php
$host = 'localhost'; // La dirección del servidor de base de datos
$dbname = 'tppp3'; // El nombre de la base de datos
$username = 'root'; // El nombre de usuario de la base de datos
$password = ''; // La contraseña del usuario de la base de datos

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos";
} catch (PDOException $e) {
    echo "Error de conexión a la base de datos: " . $e->getMessage();
}
?>
