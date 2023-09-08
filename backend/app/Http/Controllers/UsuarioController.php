<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    //listar-usuarios
    public function obtenerUsuarios()
    {
        try {
            $usuarios = Usuario::with([
                'estado_usuario:idEstadoUsuario,descripcion',
                'rol:idRol,nombre,descripcion',
                // 'pais:idPais,Descripcion',
                // 'provincia:idProvincia,Descripcion',
                // 'localidad:idLocalidad,Descripcion',
            ])->get();

            // Ocultar campos específicos de la tabla 'usuarios'
            $usuarios->makeHidden(['contrasena', 'created_at', 'updated_at']);

            // Retornar la respuesta con el usuario creado
            return response()->json($usuarios, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    //listar-usuarios-Filtrados
    public function buscarUsuario(Request $request) {
        // Obtener los valores de búsqueda desde la solicitud
        $id = $request->id;
        $nombre = $request->nombre;
        $apellido = $request->apellido;
        $correo = $request->correo;
        $rol = $request->rol;
        $estado = $request->estado;
    
        // Crear una consulta base con las relaciones
        $query = Usuario::with([
            'rol:idRol,nombre',
            'estado_usuario:idEstadoUsuario,descripcion',
        ]);
    
        // Aplicar filtros según los valores proporcionados
        if (!empty($id)) {
            $query->where('idUsuario', $id);
        }
        if (!empty($nombre)) {
            $query->where('nombre', $nombre);
        }
        if (!empty($apellido)) {
            $query->where('apellido', $apellido);
        }
        if (!empty($rol)) {
            $query->whereHas('rol', function ($subQuery) use ($rol) {
                $subQuery->where('nombre', 'like', '%' . $rol . '%');
            });
        }
        if (!empty($estado)) {
            $query->whereHas('estado_usuario', function ($subQuery) use ($estado) {
                $subQuery->where('descripcion', 'like', '%' . $estado . '%');
            });
        }
        // Ejecutar la consulta y obtener los incidentes filtrados
        $usuarios = $query->get();
    
        return response()->json($usuarios);
    }
    // Método para mostrar detalles de un usuario específico
    public function usuarioPorId($idUsuario)
    {
        $usuarios = Usuario::with(
            'estado_usuario:idEstadoUsuario,descripcion',
            'rol:idRol,nombre,descripcion',
            'pais:idPais,Descripcion',
            'provincia:idProvincia,Descripcion',
            'localidad:idLocalidad,Descripcion',
        )->find($idUsuario);;

        // Ocultar campos específicos de la tabla 'usuarios'
        $usuarios->makeHidden(['contrasena', 'created_at', 'updated_at']);

        if (!$usuarios) {
            abort(404, 'Usuario no encontrado');
        }
        return response()->json($usuarios, 200);
    }

    public function crearUsuario(Request $request)
    {
        try {
            // Cifrar la contraseña
            $contraseñaCifrada = bcrypt($request->contraseña);

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'nombre' => 'required|string|max:100',
                'apellido' => 'required|string|max:100',
                'correo' => 'required|string|max:100',
                'usuario' => 'required|string|max:50',
                'contraseña' => 'required|string|max:100',
                'telefono' => 'nullable|string|max:20',
                'celular' => 'nullable|string|max:20',
                'direccion' => 'nullable|string|max:100',
                'idRol' => 'required|exists:roles,idRol',
                'idPais' => 'required|exists:paises,idPais',
                'idProvincia' => 'required|exists:provincias,idProvincia',
                'idLocalidad' => 'required|exists:localidades,idLocalidad',
                'idEstadoUsuario' => 'required|exists:estado_usuarios,idEstadoUsuario'
            ]);

            // Crear el nuevo usuario con los datos proporcionados
            $usuario = new Usuario([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'correo' => $request->correo,
                'telefono' => $request->telefono,
                'celular' => $request->celular,
                'usuario' => $request->usuario,
                'contraseña' => $contraseñaCifrada,
                'direccion' => $request->direccion,
                'idEstadoUsuario' => $request->idEstadoUsuario,
                'idRol' => $request->idRol,
                'idPais' => $request->idPais,
                'idProvincia' => $request->idProvincia,
                'idLocalidad' => $request->idLocalidad,
            ]);

            // Guardar el usuario en la base de datos
            $usuario->save();

            // Retornar la respuesta con el usuario creado
            return response()->json($usuario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarUsuario(Request $request, $idUsuario)
    {
        try {
            // Buscar el usuario existente por su ID
            $usuario = Usuario::find($idUsuario);
            if (!$usuario) {
                abort(404, 'Usuario no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'nombre' => 'required|string|max:100',
                'apellido' => 'required|string|max:100',
                'correo' => 'required|string|max:100',
                'usuario' => 'required|string|max:50',
                'contraseña' => 'required|string|max:100',
                'telefono' => 'nullable|string|max:20',
                'celular' => 'nullable|string|max:20',//ver
                'direccion' => 'nullable|string|max:100',
                'idRol' => 'required|exists:roles,idRol',
                'idPais' => 'required|exists:paises,idPais',
                'idProvincia' => 'required|exists:provincias,idProvincia',
                'idLocalidad' => 'required|exists:localidades,idLocalidad',
                'idEstadoUsuario' => 'required|exists:estado_usuarios,idEstadoUsuario'
                

            ]);

            // Actualizar los campos del Usuario con los datos proporcionados
            $usuario->nombre = $request->nombre;
            $usuario->apellido = $request->apellido;
            $usuario->correo = $request->correo;
            $usuario->usuario = $request->usuario;
            $usuario->contraseña = bcrypt($request->contraseña);
            $usuario->telefono = $request->telefono;
            $usuario->celular = $request->celular;
            $usuario->direccion = $request->direccion;
            $usuario->idRol = $request->idRol;
            $usuario->idPais = $request->idPais;
            $usuario->idProvincia = $request->idProvincia;
            $usuario->idLocalidad = $request->idLocalidad;
            $usuario->idEstadoUsuario = $request->idEstadoUsuario;

            // Guardar los cambios en la base de datos
            $usuario->save();

            // Retornar la respuesta con el usuario creado
            return response()->json($usuario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
