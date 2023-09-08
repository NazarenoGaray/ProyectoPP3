<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Puesto;
use Illuminate\Http\Request;

class PuestoController extends Controller
{
    // Método para mostrar todos los puestos
    public function obtenerPuestos()
    {
        try {
            $puestos = Puesto::with([
                'sectores',
            ])->get();
            // Ocultar campos específicos de la tabla 'puestos'
            $puestos->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta con el puesto creado
            return response()->json($puestos, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un puesto específico
    public function obtenerPuestoPorId($idPuesto)
    {
        $puesto = Puesto::with(
            'sectores',
        )->find($idPuesto);;

        // Ocultar campos específicos de la tabla 'puesto'
        $puesto->makeHidden(['created_at', 'updated_at']);

        if (!$puesto) {
            abort(404, 'Puesto no encontrado');
        }
        return response()->json($puesto, 200);
    }

    public function obtenerEquiposDeUnPuesto($idPuesto)
    {
        try {
            $puesto = Puesto::find($idPuesto);
            if (!$puesto) {
                abort(404, 'Sector no encontrado');
            }

            // Obtener los equipos a través de la relación con la tabla puestos
            $equipos = Equipo::whereHas('puestos', function ($query) use ($idPuesto) {
                $query->where('idPuesto', $idPuesto);
            })
                ->with('puestos', 'estadoEquipo', 'tipoEquipo')
                ->get();

            return response()->json($equipos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearPuesto(Request $request)
    {
        // Validar los datos recibidos en la solicitud
        $request->validate([
            'puestoRed' => 'required|string|max:255',
            'telefono' => 'required|string|max:25',
            'descripcion' => 'required|string|max:255',
            'idSector' => 'required|exists:sectores,idSector',
        ]);
        // Crear el nuevo puesto con los datos proporcionados
        $puesto = new Puesto([
            'puestoRed' => $request->puestoRed,
            'telefono' => $request->telefono,
            'descripcion' => $request->descripcion,
            'idSector' => $request->idSector,
        ]);
        // Guardar el puesto en la base de datos
        $puesto->save();
        // Retornar la respuesta con el puesto creado
        return response()->json($puesto, 201);
    }

    public function editarPuesto(Request $request, $idPuesto)
    {
        try {
            // Buscar el puesto existente por su ID
            $puesto = Puesto::find($idPuesto);
            if (!$puesto) {
                abort(404, 'puesto no encontrado');
            }
            // Validar los datos recibidos en la solicitud
            $request->validate([
                'puestoRed' => 'required|string|max:255',
                'telefono' => 'required|string|max:25',
                'descripcion' => 'required|string|max:255',
                'idSector' => 'required|exists:sectores,idSector',
            ]);

            // Actualizar los campos del puesto con los datos proporcionados
            $puesto->puestoRed = $request->puestoRed;
            $puesto->telefono = $request->telefono;
            $puesto->descripcion = $request->descripcion;
            $puesto->idSector = $request->idSector;

            // Guardar los cambios en la base de datos
            $puesto->save();

            // Retornar la respuesta con el puesto creado
            return response()->json($puesto, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
