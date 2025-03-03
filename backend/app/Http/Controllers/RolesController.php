<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RolesController extends Controller
{
    // Método para mostrar todos los rol de los usuarios
    public function obtenerRoles()
    {
        try {
            // Obtener todos los rol de los usuarios
            $roles = Rol::all();
            // Ocultar campos específicos de la tabla 'roles'
            $roles->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($roles, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un rol específico
    public function obtenerRolPorId($idRol)
    {
        $rol = Rol::all()->find($idRol);;

        // Ocultar campos específicos de la tabla 'rol'
        $rol->makeHidden(['created_at', 'updated_at']);

        if (!$rol) {
            abort(404, 'Estado del Usuario no encontrado');
        }
        return response()->json($rol, 200);
    }

    public function crearRol(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'nombre' => 'required|string|max:100',
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea la nueva disciplina con los datos validados
            $rol = new Rol([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $rol->save();

            // Retornar la respuesta con el rol creado
            return response()->json($rol, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarRol(Request $request, $idRol)
    {
        try {
            // Buscar el rol existente por su ID
            $rol = Rol::find($idRol);
            if (!$rol) {
                abort(404, 'Rol no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'nombre' => 'required|string|max:100',
                'descripcion' => 'required|string|max:255',
            ]);

            // Actualizar los campos del rol con los datos proporcionados
            $rol->nombre = $request->nombre;
            $rol->descripcion = $request->descripcion;


            // Guardar los cambios en la base de datos
            $rol->save();

            // Retornar la respuesta con el rol creado
            return response()->json($rol, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
