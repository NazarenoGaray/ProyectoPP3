<?php

namespace App\Http\Controllers;

use App\Models\EstadoEquipo;
use Illuminate\Http\Request;

class EstadoEquipoController extends Controller
{
    // Método para mostrar todos los estados de los Equipos
    public function obtenerEstadosEquipo()
    {
        try {
            // Obtener todos los estados de los Equipos
            $estadoEquipo = EstadoEquipo::all();
            // Ocultar campos específicos de la tabla 'estadoEquipo'
            $estadoEquipo->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta con el Equipos creado
            return response()->json($estadoEquipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un estado del Equipo específico
    public function obtenerEstadoEquipoPorId($idEstadoEquipo)
    {
        $estadoEquipo = EstadoEquipo::all()->find($idEstadoEquipo);;

        // Ocultar campos específicos de la tabla 'estadoEquipo'
        $estadoEquipo->makeHidden(['created_at', 'updated_at']);

        if (!$estadoEquipo) {
            abort(404, 'Estado del Equipo no encontrado');
        }
        return response()->json($estadoEquipo, 200);
    }

    public function crearEstadoEquipo(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea la nueva disciplina con los datos validados
            $estadoEquipo = new EstadoEquipo([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $estadoEquipo->save();

            // Retornar la respuesta con el estadoEquipo creado
            return response()->json($estadoEquipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function editarEstadoEquipo(Request $request, $idEstadoEquipo)
    {
        try {
            // Buscar el estadoEquipo existente por su ID
            $estadoEquipo = EstadoEquipo::find($idEstadoEquipo);
            if (!$estadoEquipo) {
                abort(404, 'Estado del Equipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:255',

            ]);

            // Actualizar los campos del estadoEquipo con los datos proporcionados
            $estadoEquipo->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $estadoEquipo->save();

            // Retornar la respuesta con el estadoEquipo creado
            return response()->json($estadoEquipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
