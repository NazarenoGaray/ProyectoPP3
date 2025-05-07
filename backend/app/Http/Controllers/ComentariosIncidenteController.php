<?php

namespace App\Http\Controllers;

use App\Models\ComentarioIncidente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ComentariosIncidenteController extends Controller
{
    public function obtenerComentariosIncidente()
    {
        try {
            // Obtener todos los comentarios de un incidente
            $comentariosIncidente = ComentarioIncidente::all();

            // Ocultar campos específicos de la tabla 'ComentariosIncidente'
            $comentariosIncidente->makeHidden(['created_at']);

            // Agregar logs para verificar los valores
            info($comentariosIncidente);

            // Retornar la respuesta con el ComentariosIncidente creado
            return response()->json($comentariosIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function obtenerComentariosPoridIncidente($idIncidente)
    {
        try {
            // Verificar si $idIncidente es un número válido
            if (!is_numeric($idIncidente)) {
                return response()->json(['error' => 'El ID del incidente no es válido'], 400);
            }

            $comentarioIncidente = DB::select("
            SELECT
                c.idComentario,
                c.comentario AS comentarioIncidente,
                t.descripcion AS tipoComentario,
                u.nombre AS nombreUsuario,
                u.apellido AS apellidoUsuario,
                r.nombre AS rolUsuario,
                t.descripcion as tipoComentario,
                c.updated_at as fechaHora

            FROM comentarios_incidente c
            LEFT JOIN tipo_comentarios t ON c.idTipoComentario = t.idTipoComentario
            LEFT JOIN usuarios u ON c.idUsuario = u.idUsuario
            LEFT JOIN roles r ON u.idRol = r.idRol

            WHERE c.idIncidente = ?
            ORDER BY c.updated_at
        ", [$idIncidente]);

            // if (empty($comentarioIncidente)) {
            //     return response()->json(['error' => 'No se encontraron comentarios para el incidente especificado'], 404);
            // }

            return response()->json($comentarioIncidente, 200);
        } catch (\Exception $e) {
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function crearComentarioIncidente(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'comentario' => 'required|string',
                'idUsuario' => 'required|exists:usuarios,idUsuario',
                'idIncidente' => 'required|exists:incidentes,idIncidente',
                'idTipoComentario' => 'required|exists:tipo_comentarios,idTipoComentario',
                
            ]);
            // 'fechaHora' => 'required|date_format:Y-m-d H:i:s',

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
            Log::info('error:',['error' => $e->getMessage()]);
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
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}