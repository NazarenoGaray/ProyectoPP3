<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conectar a la base de datos
$db = new PDO("mysql:host=localhost;dbname=tppp3", "root", "");

// Definir las rutas y los métodos HTTP
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener los datos de la base de datos
    $query = $db->query("SELECT * FROM usuarios INNER JOIN rol ON usuarios.id_rol = rol.id_rol");
    $usuarios = $query->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los datos en formato JSON
    header('Content-Type: application/json');
    echo json_encode($usuarios);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados por el cliente
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $domicilio = $_POST['domicilio'];
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    $id_rol = $_POST['id_rol'];

    // Agregar un nuevo usuario a la base de datos
    $stmt = $db->prepare("INSERT INTO usuarios (nombre, apellido, direccion, telefono, correo, domicilio, usuario, contrasena, id_rol) VALUES (:nombre, :apellido, :direccion, :telefono, :correo, :domicilio, :usuario, :contrasena, :id_rol)");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':apellido', $apellido);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':domicilio', $domicilio);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->bindParam(':id_rol', $id_rol);
    $stmt->execute();

    // Devolver una respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode(array('message' => 'Usuario agregado correctamente'));
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Obtener los datos enviados por el cliente
    parse_str(file_get_contents('php://input'), $_PUT);
    $id_usuario = $_PUT['id_usuario'];
    $nombre = $_PUT['nombre'];
    $apellido = $_PUT['apellido'];
    $direccion = $_PUT['direccion'];
    $telefono = $_PUT['telefono'];
    $correo = $_PUT['correo'];
    $domicilio = $_PUT['domicilio'];
    $usuario = $_PUT['usuario'];
    $contrasena = $_PUT['contrasena'];
    $id_rol = $_PUT['id_rol'];

    // Actualizar el usuario en la base de datos
    $stmt = $db->prepare("UPDATE usuarios SET nombre = :nombre, apellido = :apellido, direccion = :direccion, telefono = :telefono, correo = :correo, domicilio = :domicilio, usuario = :usuario, contrasena = :contrasena, id_rol = :id_rol WHERE id_usuario = :id_usuario");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':apellido', $apellido);
    $stmt->bindParam(':direccion', $direccion);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':domicilio', $domicilio);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':contrasena', $contrasena);
    $stmt->bindParam(':id_rol', $id_rol);
    $stmt->bindParam(':id_usuario', $id_usuario);
    $stmt->execute();

    // Devolver una respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode(array('message' => 'Usuario actualizado correctamente'));
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obtener el ID del usuario a eliminar
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id_usuario = $_DELETE['id_usuario'];

    // Eliminar el usuario de la base de datos
    $stmt = $db->prepare("DELETE FROM usuarios WHERE id_usuario = :id_usuario");
    $stmt->bindParam(':id_usuario', $id_usuario);
    $stmt->execute();

    // Devolver una respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode(array('message' => 'Usuario eliminado correctamente'));
}
