<?php

namespace App\Http\Controllers;

use App\Models\EstadoUsuario;
use Illuminate\Http\Request;

class EstadoUsuarioController extends Controller
{
    // Método para mostrar todos los estados de los usuarios
    public function obtenerEstadosUsuario()
    {
        try {
            // Obtener todos los estados de los usuarios
            $estadoUsuarios = EstadoUsuario::all();
            // Ocultar campos específicos de la tabla 'estadoUsuarios'
            $estadoUsuarios->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($estadoUsuarios, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un estado del usuario específico
    public function obtenerEstadoUsuarioPorId($idEstadoUsuario)
    {
        $estadoUsuario = EstadoUsuario::all()->find($idEstadoUsuario);;

        // Ocultar campos específicos de la tabla 'estadoUsuario'
        $estadoUsuario->makeHidden(['created_at', 'updated_at']);

        if (!$estadoUsuario) {
            abort(404, 'Estado del Usuario no encontrado');
        }
        return response()->json($estadoUsuario, 200);
    }

    public function crearEstadoUsuario(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:50',
            ]);

            // Crea la nueva disciplina con los datos validados
            $estadoUsuario = new EstadoUsuario([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $estadoUsuario->save();

            // Retornar la respuesta con el estadoUsuario creado
            return response()->json($estadoUsuario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarEstadoUsuario(Request $request, $idEstadoUsuario)
    {
        try {
            // Buscar el estadoUsuario existente por su ID
            $estadoUsuario = EstadoUsuario::find($idEstadoUsuario);
            if (!$estadoUsuario) {
                abort(404, 'estadoUsuario no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:50',

            ]);

            // Actualizar los campos del estadoUsuario con los datos proporcionados
            $estadoUsuario->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $estadoUsuario->save();

            // Retornar la respuesta con el estadoUsuario creado
            return response()->json($estadoUsuario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
