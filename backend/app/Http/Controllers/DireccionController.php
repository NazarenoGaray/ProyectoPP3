<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;
use App\Models\Provincia;
use App\Models\Localidad;

class DireccionController extends Controller
{
    public function obtenerTodosPaises()
    {
        $paises = Pais::select('idPais', 'Descripcion')->get();
        return response()->json($paises);
    }

    public function obtenerTodasProvincias()
    {
        $provincias = Provincia::select('idPais', 'idProvincia', 'Descripcion')->get();
        return response()->json($provincias);
    }

    public function obtenerTodasLocalidades()
    {
        $localidades = Localidad::select('idLocalidad', 'idProvincia', 'Descripcion')->limit(50)->get();
        return response()->json($localidades);
    }

    public function obtenerProvinciasPorPais($idPais)
    {
        // Obtener las provincias del país seleccionado
        $provincias = Provincia::where('idPais', $idPais)->get();

        return response()->json($provincias);
    }

    public function obtenerLocalidadesPorProvincia($idProvincia)
    {
        // Obtener las localidades de la provincia seleccionada
        $localidades = Localidad::where('idProvincia', $idProvincia)->get();

        return response()->json($localidades);
    }
}
