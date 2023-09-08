<?php

namespace App\Http\Controllers;

use App\Models\ComentarioIncidente;
use Illuminate\Http\Request;

class ComentariosIncidenteController extends Controller
{
    public function obtenerComentariosIncidente()
    {
        try {
            // Obtener todos los comentarios de un incidente
            $comentariosIncidente = ComentarioIncidente::all();

            // Ocultar campos específicos de la tabla 'ComentariosIncidente'
            $comentariosIncidente->makeHidden(['created_at', 'updated_at']);

            // Agregar logs para verificar los valores
            info($comentariosIncidente);

            // Retornar la respuesta con el ComentariosIncidente creado
            return response()->json($comentariosIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un tipo de Comentario específico
    public function obtenerComentarioIncidentePorId($idTipoComentario)
    {
        $comentarios_incidente = ComentarioIncidente::with('usuario')->find($idTipoComentario);

        if (!$comentarios_incidente) {
            abort(404, 'Tipo Comentario no encontrado');
        }

        // Ocultar campos en el modelo de usuario asociado
        $comentarios_incidente->usuario->setHidden(['contrasena', 'created_at', 'updated_at']);

        // Ocultar campos específicos de la tabla 'tipoComentario'
        $comentarios_incidente->makeHidden(['created_at', 'updated_at']);

        return response()->json($comentarios_incidente, 200);
    }


    public function crearComentarioIncidente(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'comentario' => 'required|string',
                'fechaHora' => 'required|date_format:Y-m-d H:i:s',
                'idUsuario' => 'required|exists:usuarios,idUsuario',
                'idIncidente' => 'required|exists:incidentes,idIncidente',
                'idTipoComentario' => 'required|exists:tipo_comentarios,idTipoComentario',

            ]);

            // Crear el nuevo Comentario con los datos validados
            $comentarioIncidente = new ComentarioIncidente([
                'comentario' => $request->comentario,
                'fechaHora' => $request->fechaHora,
                'idUsuario' => $request->idUsuario,
                'idIncidente' => $request->idIncidente,
                'idTipoComentario' => $request->idTipoComentario,

            ]);

            // Guardar los datos en la base de datos
            $comentarioIncidente->save();

            // Retornar la respuesta con el comentarioIncidente creado
            return response()->json($comentarioIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarComentarioIncidente(Request $request, $idTipoComentario)
    {
        try {
            // Buscar el tipoComentario existente por su ID
            $tipoComentario = ComentarioIncidente::find($idTipoComentario);
            if (!$tipoComentario) {
                abort(404, 'tipoComentario no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'comentario' => 'required|string',
                'fechaHora' => 'required|date_format:Y-m-d H:i:s',
                'idUsuario' => 'required|exists:usuarios,idUsuario',
                'idIncidente' => 'required|exists:incidentes,idIncidente',
            ]);

            // Actualizar los campos del tipoComentario con los datos proporcionados
            $tipoComentario->comentario = $request->comentario;
            $tipoComentario->fechaHora = $request->fechaHora;
            $tipoComentario->idUsuario = $request->idUsuario;
            $tipoComentario->idIncidente = $request->idIncidente;

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
