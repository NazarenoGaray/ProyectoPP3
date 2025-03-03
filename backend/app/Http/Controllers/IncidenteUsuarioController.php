<?php

namespace App\Http\Controllers;

use App\Models\IncidenteUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IncidenteUsuarioController extends Controller
{
    public function obtenerUsuariosDeLosIncidentes()
    {
        try {
            $incidenteUsuarios = IncidenteUsuario::all();

            return response()->json($incidenteUsuarios, 200);
        } catch (\Exception $e) {
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // public function obtenerUsuariosDeUnIncidente($idIncidente)
    // {
    //     $incidenteUsuarios = IncidenteUsuario::with('usuario', 'usuario.rol')->where('idIncidente', $idIncidente)->get();

    //     if ($incidenteUsuarios->isEmpty()) {
    //         return response()->json(['error' => 'Incidente no encontrado'], 404);
    //     }

    //     return response()->json($incidenteUsuarios, 200);
    // }

    public function obtenerUsuariosDeUnIncidente($idIncidente)
    {
        $incidenteUsuarios = IncidenteUsuario::with('usuario', 'usuario.rol')->where('idIncidente', $idIncidente)->get();

        if ($incidenteUsuarios->isEmpty()) {
            return response()->json(['error' => 'Incidente no encontrado'], 404);
        }

        // Construir la respuesta incluyendo el campo 'esObservador'
        $usuariosConObservador = $incidenteUsuarios->map(function ($incidenteUsuario) {
            return [
                'usuario' => $incidenteUsuario->usuario,
                'esObservador' => $incidenteUsuario->esObservador,
            ];
        });

        return response()->json($usuariosConObservador, 200);
    }




    public function obtenerIncidentesDeUnUsuario($idUsuario)
    {
        $incidenteUsuarios = IncidenteUsuario::with('incidente')->where('idUsuario', $idUsuario)->get();

        if ($incidenteUsuarios->isEmpty()) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        return response()->json($incidenteUsuarios, 200);
    }

    public function crearOEditarIncidenteUsuario(Request $request)
    {
        try {
            $request->validate([
                'idIncidente' => 'required|exists:incidentes,idIncidente',
                'idUsuario' => 'required|exists:usuarios,idUsuario',
                'esObservador' => 'required|boolean',
            ]);

            $incidenteUsuario = IncidenteUsuario::updateOrCreate(
                [
                    'idIncidente' => $request->idIncidente,
                    'idUsuario' => $request->idUsuario,
                ],
                [
                    'esObservador' => $request->esObservador,
                ]
            );

            return response()->json($incidenteUsuario, 201); // Puedes cambiar el código de respuesta según el caso
        } catch (\Exception $e) {
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
