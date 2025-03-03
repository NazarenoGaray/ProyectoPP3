<?php

namespace App\Http\Controllers;

use App\Models\TipoEquipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TipoEquipoController extends Controller
{
    // Método para mostrar todos los tipos equipos
    public function obtenerTipoEquipos()
    {
        try {
            // Obtener todos los tipos equipos
            $tipoEquipos = TipoEquipo::all();
            // Ocultar campos específicos de la tabla 'tipoEquipos'
            $tipoEquipos->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($tipoEquipos, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    // Método para mostrar detalles de un tipo de equipo específico
    public function obtenerTipoEquipoPorId($idTipoEquipo)
    {
        $tipoEquipo = TipoEquipo::all()->find($idTipoEquipo);;

        // Ocultar campos específicos de la tabla 'tipoEquipos'
        $tipoEquipo->makeHidden(['created_at', 'updated_at']);

        if (!$tipoEquipo) {
            abort(404, 'Tipo Equipo no encontrado');
        }
        return response()->json($tipoEquipo, 200);
    }

    public function crearTipoEquipo(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea el nuevo Tipo de Equipo con los datos validados
            $tipoEquipo = new TipoEquipo([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $tipoEquipo->save();

            // Retornar la respuesta con el TipoEquipo creado
            return response()->json($tipoEquipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarTipoEquipo(Request $request, $idTipoEquipo)
    {
        try {
            // Buscar el TipoEquipo existente por su ID
            $tipoEquipo = TipoEquipo::find($idTipoEquipo);
            if (!$tipoEquipo) {
                abort(404, 'TipoEquipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:255',

            ]);

            // Actualizar los campos del tipoEquipo con los datos proporcionados
            $tipoEquipo->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $tipoEquipo->save();

            // Retornar la respuesta con el tipoEquipo creado
            return response()->json($tipoEquipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
