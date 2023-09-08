<?php

namespace App\Http\Controllers;

use App\Models\IncidenteEquipo;
use Illuminate\Http\Request;

class IncidenteEquipoController extends Controller
{
    public function obtenerEquiposDeUnIncidente($idIncidente)
    {
        $incidenteEquipo = IncidenteEquipo::with('equipos')->where('idIncidente', $idIncidente)->get();

        if ($incidenteEquipo->isEmpty()) {
            return response()->json(['error' => 'Incidente no encontrado'], 404);
        }

        // Accede a la relación 'equipo' para obtener los datos de los equipos
        $equipos = $incidenteEquipo->pluck('equipos');

        return response()->json($equipos, 200);
    }
    
}
