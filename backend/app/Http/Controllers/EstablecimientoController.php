<?php

namespace App\Http\Controllers;

use App\Models\Establecimiento;
use App\Models\Sector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstablecimientoController extends Controller
{
    //
    // public function obtenerEstablecimientos()
    // {
    //     try {
    //         $establecimientos = Establecimiento::with([
    //             'pais:idPais,Descripcion',
    //             'provincia:idProvincia,Descripcion',
    //             'localidad:idLocalidad,Descripcion',
    //         ])->get();
 
    //         // Ocultar campos específicos de la tabla 'establecimientos'
    //         $establecimientos->makeHidden(['created_at', 'updated_at']);

    //         // Retornar la respuesta con el establecimiento creado
    //         return response()->json($establecimientos, 201);
    //     } catch (\Exception $e) {
    //         // Capturar cualquier excepción y mostrar el mensaje de error
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }


    // Método para mostrar detalles de un establecimiento específico
    public function establecimientoPorId($idEstablecimiento)
    {
        $establecimiento = Establecimiento::with(
            'pais:idPais,Descripcion',
            'provincia:idProvincia,Descripcion',
            'localidad:idLocalidad,Descripcion',
        )->find($idEstablecimiento);;

        // Ocultar campos específicos de la tabla 'establecimiento'
        $establecimiento->makeHidden(['contrasena', 'created_at', 'updated_at']);

        if (!$establecimiento) {
            abort(404, 'establecimiento no encontrado');
        }
        return response()->json($establecimiento, 200);
    }

    public function obtenerEstablecimientos()
    {
        try {
            $establecimientos = DB::select("
            SELECT
            establecimientos.idEstablecimiento,nombre,calle,altura,
            paises.Descripcion AS paisEstablecimiento,
            provincias.Descripcion AS provinciaEstablecimiento,
            localidades.Descripcion AS localidadEstablecimiento
            FROM establecimientos
            LEFT JOIN paises ON establecimientos.idPais = paises.idPais
            LEFT JOIN provincias ON establecimientos.idProvincia = provincias.idProvincia
            LEFT JOIN localidades ON establecimientos.idLocalidad = localidades.idLocalidad

            ", );

            if (empty($establecimientos)) {
                abort(404, 'Establecimientos no encontrado');
            }

            return response()->json($establecimientos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearEstablecimiento(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'nombre' => 'required|string|max:100',
                'calle' => 'required|string|max:60',
                'altura' => 'required|string|max:10',
                'telefono' => 'nullable|string|max:25',
                'correo' => 'required|string|max:60',
                'cuit' => 'nullable|string|max:20',
                'descripcion'  => 'nullable|string',
                'sitioweb' => 'nullable|string|max:255',
                'idPais' => 'required|exists:paises,idPais',
                'idProvincia' => 'required|exists:provincias,idProvincia',
                'idLocalidad' => 'required|exists:localidades,idLocalidad',
            ]);

            // Crea la nueva disciplina con los datos validados
            $establecimiento = new Establecimiento([
                'nombre' => $request->nombre,
                'calle' => $request->calle,
                'altura' => $request->altura,
                'telefono' => $request->telefono,
                'correo' => $request->correo,
                'cuit' => $request->cuit,
                'descripcion' => $request->descripcion,
                'sitioweb' => $request->sitioweb,
                'idPais' => $request->idPais,
                'idProvincia' => $request->idProvincia,
                'idLocalidad' => $request->idLocalidad,
            ]);

            // Guardar los datos en la base de datos
            $establecimiento->save();

            // Retornar la respuesta con el establecimiento creado
            return response()->json($establecimiento, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    // Método para mostrar todos los sectores de un Establecimiento
    public function obtenerSectoresDeUnEstablecimiento($idEstablecimiento)
    {
        try {
            // Buscar el Establecimiento existente por su ID
            $establecimiento = Establecimiento::find($idEstablecimiento);
            if (!$establecimiento) {
                abort(404, 'Establecimiento no encontrado');
            }

            // Obtener los sectores que pertenecen al Establecimiento y ordenar alfabéticamente
            $sectores = Sector::where('idEstablecimiento', $idEstablecimiento)
                ->orderBy('nombre', 'asc')
                ->get();
            $sectores->makeHidden(['created_at', 'updated_at']);


            // Retornar la respuesta con los sectores ordenados del Establecimiento
            return response()->json($sectores, 200);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function actualizarEstablecimiento(Request $request, $idEstablecimiento)
    {
        try {
            // Buscar el establecimiento existente por su ID
            $establecimiento = Establecimiento::find($idEstablecimiento);
            if (!$establecimiento) {
                abort(404, 'establecimiento no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'nombre' => 'required|string|max:100',
                'calle' => 'required|string|max:60',
                'altura' => 'required|string|max:10',
                'telefono' => 'nullable|string|max:25',
                'correo' => 'required|string|max:60',
                'cuit' => 'nullable|string|max:20',
                'descripcion'  => 'nullable|string|',
                'sitioweb' => 'nullable|string|max:255',
                'idPais' => 'required|exists:paises,idPais',
                'idProvincia' => 'required|exists:provincias,idProvincia',
                'idLocalidad' => 'required|exists:localidades,idLocalidad',

            ]);

            // Actualizar los campos del club con los datos proporcionados
            $establecimiento->nombre = $request->nombre;
            $establecimiento->calle = $request->calle;
            $establecimiento->altura = $request->altura;
            $establecimiento->telefono = $request->telefono;
            $establecimiento->correo = $request->correo;
            $establecimiento->cuit = $request->cuit;
            $establecimiento->descripcion = $request->descripcion;
            $establecimiento->sitioweb = $request->sitioweb;
            $establecimiento->idPais = $request->idPais;
            $establecimiento->idProvincia = $request->idProvincia;
            $establecimiento->idLocalidad = $request->idLocalidad;

            // Guardar los cambios en la base de datos
            $establecimiento->save();

            // Retornar la respuesta con el establecimiento creado
            return response()->json($establecimiento, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
