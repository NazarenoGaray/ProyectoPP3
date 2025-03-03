<?php

namespace App\Http\Controllers;

use App\Models\EstadoIncidente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EstadoIncidenteController extends Controller
{
    // Método para mostrar todas los estados de los incidentes
    public function obtenerEstadosIncidente()
    {
        try {
            // Obtener todas las estado de los incidentes
            $estadoIncidente = EstadoIncidente::all();
            // Ocultar campos específicos de la tabla 'estado_incidentes'
            $estadoIncidente->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($estadoIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un Estado específica
    public function obtenerEstadoIncidentePorId($idEstadoIncidente)
    {
        $estadoIncidente = EstadoIncidente::all()->find($idEstadoIncidente);;

        // Ocultar campos específicos de la tabla 'categoria_incidentes'
        $estadoIncidente->makeHidden(['created_at', 'updated_at']);

        if (!$estadoIncidente) {
            abort(404, 'Categorias de los Incidentes no encontradas');
        }
        return response()->json($estadoIncidente, 200);
    }

    public function crearEstadoIncidente(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea la nueva disciplina con los datos validados
            $estadoIncidente = new EstadoIncidente([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $estadoIncidente->save();

            // Retornar la respuesta con el estadoIncidente creado
            return response()->json($estadoIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarEstadoIncidente(Request $request, $idEstadoIncidente)
    {
        try {
            // Buscar el estadoIncidente existente por su ID
            $estadoIncidente = EstadoIncidente::find($idEstadoIncidente);
            if (!$estadoIncidente) {
                abort(404, 'Estado del Equipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:255',

            ]);
            // Actualizar los campos del estadoIncidente con los datos proporcionados
            $estadoIncidente->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $estadoIncidente->save();

            // Retornar la respuesta con el estadoIncidente creado
            return response()->json($estadoIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
