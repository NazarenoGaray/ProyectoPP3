<?php

namespace App\Http\Controllers;

use App\Models\PrioridadIncidente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PrioridadIncidenteController extends Controller
{
    // Método para mostrar todas las prioridad de los incidentes
    public function obtenerPrioridadIncidente()
    {
        try {
            // Obtener todas las prioridades de los incidentes
            $prioridadIncidente = PrioridadIncidente::all();
            // Ocultar campos específicos de la tabla 'categoria_incidentes'
            $prioridadIncidente->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($prioridadIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de una Prioridad específica
    public function obtenerPrioridadIncidentePorId($idPrioridadIncidente)
    {
        $prioridadIncidente = PrioridadIncidente::all()->find($idPrioridadIncidente);;

        // Ocultar campos específicos de la tabla 'Prioridad_incidentes'
        $prioridadIncidente->makeHidden(['created_at', 'updated_at']);

        if (!$prioridadIncidente) {
            abort(404, 'Prioridad de los Incidentes no encontradas');
        }
        return response()->json($prioridadIncidente, 200);
    }

    public function crearPrioridadIncidente(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea la nueva disciplina con los datos validados
            $prioridadIncidente = new PrioridadIncidente([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $prioridadIncidente->save();

            // Retornar la respuesta con el prioridadIncidente creado
            return response()->json($prioridadIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarPrioridadIncidente(Request $request, $idPrioridadIncidente)
    {
        try {
            // Buscar el prioridadIncidente existente por su ID
            $prioridadIncidente = PrioridadIncidente::find($idPrioridadIncidente);
            if (!$prioridadIncidente) {
                abort(404, 'Estado del Equipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:255',

            ]);
            // Actualizar los campos del prioridadIncidente con los datos proporcionados
            $prioridadIncidente->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $prioridadIncidente->save();

            // Retornar la respuesta con el prioridadIncidente creado
            return response()->json($prioridadIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
