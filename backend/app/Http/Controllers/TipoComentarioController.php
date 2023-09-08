<?php

namespace App\Http\Controllers;

use App\Models\TipoComentario;
use Illuminate\Http\Request;

class TipoComentarioController extends Controller
{
    // Método para mostrar todos los tipos comentarios
    public function obtenerTipoComentario()
    {
        try {
            $tipoComentario = TipoComentario::all();
            // Ocultar campos específicos de la tabla 'tipo_comentario'
            $tipoComentario->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($tipoComentario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un tipo de Comentario específico
    public function obtenerTipoComentarioPorId($idTipoComentario)
    {
        $tipoComentario = TipoComentario::all()->find($idTipoComentario);;

        // Ocultar campos específicos de la tabla 'tipoComentarios'
        $tipoComentario->makeHidden(['created_at', 'updated_at']);

        if (!$tipoComentario) {
            abort(404, 'tipoComentario no encontrado');
        }
        return response()->json($tipoComentario, 200);
    }

    public function crearTipoComentario(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea la nueva disciplina con los datos validados
            $tipoComentario = new TipoComentario([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $tipoComentario->save();

            // Retornar la respuesta con el tipoComentario creado
            return response()->json($tipoComentario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarTipoComentario(Request $request, $idTipoComentario)
    {
        try {
            // Buscar el tipoComentario existente por su ID
            $tipoComentario = TipoComentario::find($idTipoComentario);
            if (!$tipoComentario) {
                abort(404, 'tipoComentario no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:255',

            ]);
            // Actualizar los campos del tipoComentario con los datos proporcionados
            $tipoComentario->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $tipoComentario->save();

            // Retornar la respuesta con el tipoComentario creado
            return response()->json($tipoComentario, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
