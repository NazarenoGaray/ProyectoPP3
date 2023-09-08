<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Puesto;
use App\Models\Sector;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    public function obtenerSectores()
    {
        try {
            $sectores = Sector::with([
                'establecimiento',
            ])->get();
            // Ocultar campos específicos de la tabla 'sectores'
            $sectores->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta con el sector creado
            return response()->json($sectores, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un sector específico
    public function obtenerSectorPorId($idSector)
    {
        $sector = Sector::with(
            'establecimiento',
        )->find($idSector);;

        // Ocultar campos específicos de la tabla 'sector'
        $sector->makeHidden(['created_at', 'updated_at']);

        if (!$sector) {
            abort(404, 'Sector no encontrado');
        }
        return response()->json($sector, 200);
    }

    // // Método para mostrar todos los puestos y equipos de un sector
    // public function obtenerPuestosYEquiposDeUnSector($idSector)
    // {
    //     try {
    //         // Buscar el sector existente por su ID
    //         $sector = Sector::find($idSector);
    //         if (!$sector) {
    //             abort(404, 'Sector no encontrado');
    //         }

    //         // Obtener los puestos que pertenecen al sector con sus equipos
    //         $puestos = Puesto::where('idSector', $idSector)
    //             // ->with('equipos')
    //             ->with('equipos.estadoEquipo', 'equipos.tipoEquipo')

    //             ->get();

    //         // Retornar la respuesta con los puestos y equipos del sector
    //         return response()->json($puestos, 200);
    //     } catch (\Exception $e) {
    //         // Capturar cualquier excepción y mostrar el mensaje de error
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }

    public function obtenerPuestosDeUnSector($idSector)
    {
        try {
            $sector = Sector::find($idSector);
            if (!$sector) {
                abort(404, 'Sector no encontrado');
            }

            $puestos = Puesto::where('idSector', $idSector)
                ->get();

            return response()->json($puestos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function obtenerEquiposDeUnSector($idSector)
    {
        try {
            $sector = Sector::find($idSector);
            if (!$sector) {
                abort(404, 'Sector no encontrado');
            }
    
            // Obtener los equipos a través de la relación con la tabla puestos
            $equipos = Equipo::whereHas('puestos', function ($query) use ($idSector) {
                $query->where('idSector', $idSector);
            })
            ->with('puestos', 'estadoEquipo', 'tipoEquipo')
            ->get();
    
            return response()->json($equipos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    



    public function crearSector(Request $request)
    {
        // Validar los datos recibidos en la solicitud
        $request->validate([
            'idEstablecimiento' => 'required|exists:establecimientos,idEstablecimiento',
            'nombre' => 'required|string|max:255',
            'ubicacion' => 'required|string|max:255',
        ]);

        // Crear el nuevo sector con los datos proporcionados
        $sector = new Sector([
            'nombre' => $request->nombre,
            'ubicacion' => $request->ubicacion,
            'idEstablecimiento' => $request->idEstablecimiento,
        ]);

        // Guardar el sector en la base de datos
        $sector->save();

        // Retornar la respuesta con el sector creado
        return response()->json($sector, 201);
    }



    public function editarSector(Request $request, $idSector)
    {
        try {
            // Buscar el sector existente por su ID
            $sector = Sector::find($idSector);
            if (!$sector) {
                abort(404, 'sector no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'nombre' => 'required|string|max:255',
                'ubicacion' => 'required|string|max:255',
            ]);

            // Actualizar los campos del sector con los datos proporcionados
            $sector->nombre = $request->nombre;
            $sector->ubicacion = $request->ubicacion;

            // Guardar los cambios en la base de datos
            $sector->save();

            // Retornar la respuesta con el sector creado
            return response()->json($sector, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
