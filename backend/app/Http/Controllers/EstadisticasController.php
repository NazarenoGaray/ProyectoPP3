<?php

// establecimientos con mas incidencias - tipo de incidentes en general
// media de resolucion del tecnico - media de resolucion  - cantidad de dias de tkt abiertos 

namespace App\Http\Controllers;

use App\Models\Incidente;
use App\Models\Establecimiento;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstadisticasController extends Controller
{

    public function incidentesPorFecha(Request $request)
    {
        $fechaInicioSeleccionada = $request->input('fechaInicio');
        $fechaFinalizacionSeleccionada = $request->input('fechaFinalizacion');

        $totalIncidentes = Incidente::whereDate('created_at', '>=', $fechaInicioSeleccionada)
            ->whereDate('created_at', '<=', $fechaFinalizacionSeleccionada)
            ->count();

        $incidentesSolucionados = Incidente::whereDate('created_at', '>=', $fechaInicioSeleccionada)
            ->whereDate('created_at', '<=', $fechaFinalizacionSeleccionada)
            ->where('idEstadoIncidente', 4)
            ->count();

        $incidentesAbiertos = Incidente::whereDate('created_at', '>=', $fechaInicioSeleccionada)
            ->whereDate('created_at', '<=', $fechaFinalizacionSeleccionada)
            ->where('idEstadoIncidente', '!=', 4)
            ->count();

        return response()->json([
            'totalIncidentes' => $totalIncidentes,
            'incidentesSolucionados' => $incidentesSolucionados,
            'incidentesAbiertos' => $incidentesAbiertos,
        ]);
    }

    public function establecimientosConMasIncidencias()
    {
        $establecimientosConMasIncidencias = Incidente::select(
            'idEstablecimiento',
            DB::raw('count(*) as totalIncidentes')
        )
            ->groupBy('idEstablecimiento')
            ->orderByDesc('totalIncidentes')
            ->limit(5)
            ->get();

        // Obtener los nombres de los establecimientos
        $establecimientosConMasIncidencias = $establecimientosConMasIncidencias->map(function ($item) {
            $establecimiento = Establecimiento::find($item->idEstablecimiento);
            $item->nombre = $establecimiento->nombre; // Agregar el nombre al objeto
            return $item;
        });

        return response()->json([
            'establecimientosConMasIncidencias' => $establecimientosConMasIncidencias,
        ]);
    }
}
