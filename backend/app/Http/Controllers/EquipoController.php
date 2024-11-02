<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Puesto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class EquipoController extends Controller
{
    // Método para mostrar todos los equipos
    public function obtenerEquipos()
    {
        try {
            // Obtener todos los s equipos
            $equipos = Equipo::all();
            // Ocultar campos específicos de la tabla 'equipos'
            $equipos->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($equipos, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    // Método para mostrar detalles de un equipo específico
    // public function obtenerEquipoPorId($idEquipo)
    // {
    //     $equipo = Equipo::with([
    //         'estadoEquipo',
    //         'tipoEquipo',
    //         'puestos' => function ($query) {
    //             $query->select('idPuesto', 'puestoRed', 'descripcion', 'telefono', 'idSector');
    //         },
    //         'puestos.sectores' => function ($query) {
    //             $query->select('idSector', 'nombre', 'ubicacion', 'idEstablecimiento');
    //         },
    //         'puestos.sectores.establecimiento' => function ($query) {
    //             $query->select('idEstablecimiento', 'nombre');
    //         },
    //     ])->find($idEquipo);

    //     // Ocultar campos específicos de la tabla 'Equipos'
    //     $equipo->makeHidden(['created_at', 'updated_at']);

    //     if (!$equipo) {
    //         abort(404, 'Equipo no encontrado');
    //     }

    //     return response()->json($equipo, 200);
    // }

    public function obtenerEquipoPorId($idEquipo)
    {
        try {
            $equipo = DB::select("
                SELECT
                    establecimientos.idEstablecimiento,
                    sectores.idSector,
                    sectores.nombre AS nombreSector,
                    sectores.ubicacion AS ubicacionSector,

                    equipos.idEquipo,
                    equipos.nombre, marca, modelo, numeroSerie, fechaAlta, fechaBaja,
                    equipos.descripcion,
                    estado_equipos.descripcion AS estadoEquipo,
                    tipo_equipos.descripcion AS tipoEquipo,
                    puestos.idPuesto, puestoRed,
                    puestos.descripcion AS puestoDescripcion,
                    puestos.telefono AS puestoTelefono,
                    
                    puestos.idSector AS puestoIdSector,
                    sectores.idSector AS sectorIdSector,
                    sectores.nombre AS sectorNombre,
                    sectores.ubicacion AS sectorUbicacion,
                    sectores.idEstablecimiento AS sectorIdEstablecimiento,
                    establecimientos.idEstablecimiento AS establecimientoIdEstablecimiento,
                    establecimientos.nombre AS establecimientoNombre
                    
                FROM equipos
                LEFT JOIN estado_equipos ON equipos.idEstadoEquipo = estado_equipos.idEstadoEquipo
                LEFT JOIN tipo_equipos ON equipos.idTipoEquipo = tipo_equipos.idTipoEquipo
                LEFT JOIN puestos ON equipos.idPuesto = puestos.idPuesto
                LEFT JOIN sectores ON puestos.idSector = sectores.idSector
                LEFT JOIN establecimientos ON sectores.idEstablecimiento = establecimientos.idEstablecimiento

                WHERE equipos.idEquipo = ?
            ", [$idEquipo]);

            if (empty($equipo)) {
                abort(404, 'Equipo no encontrado');
            }

            return response()->json($equipo[0], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function obtenerHistorialComentariosEquipo($idEquipo)
    {
        try {
            $historialComentarios = Equipo::select(
                'incidentes.idIncidente',
                'incidentes.titulo AS titulo_incidente',
                'comentarios_incidente.comentario',
                'usuarios.nombre AS nombreUsuario',
                'usuarios.apellido AS apellidoUsuario',
                'comentarios_incidente.fechaHora AS fechaComentario',
                // 'comentarios_incidente.updated_at AS ultimaActualizacion'
            )
                ->join('incidente_equipos', 'equipos.idEquipo', '=', 'incidente_equipos.idEquipo')
                ->join('incidentes', 'incidente_equipos.idIncidente', '=', 'incidentes.idIncidente')
                ->join('comentarios_incidente', 'incidentes.idIncidente', '=', 'comentarios_incidente.idIncidente')
                ->join('usuarios', 'usuarios.idUsuario', '=', 'comentarios_incidente.idUsuario')

                ->where('equipos.idEquipo', $idEquipo)
                ->orderBy('fechaComentario', 'ASC')
                ->get();

            return response()->json($historialComentarios, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function crearEquipo(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'nombre' => 'nullable|string|max:100',
                'marca' => 'nullable|string|max:100',
                'modelo' => 'nullable|string|max:100',
                'numeroSerie' => 'nullable|string|max:255',
                'descripcion' => 'nullable|string|max:255',
                'fechaAlta' => 'nullable|date_format:Y-m-d',
                'fechaBaja' => 'nullable|date_format:Y-m-d',
                'idPuesto' => 'required|exists:puestos,idPuesto',
                'idEstadoEquipo' => 'required|exists:estado_equipos,idEstadoEquipo',
                'idTipoEquipo' => 'required|exists:tipo_equipos,idTipoEquipo',
            ]);

            // Crea la nueva disciplina con los datos validados
            $equipo = new Equipo([
                'nombre' => $request->nombre,
                'marca' => $request->marca,
                'modelo' => $request->modelo,
                'numeroSerie' => $request->numeroSerie,
                'descripcion' => $request->descripcion,
                'fechaAlta' => $request->fechaAlta,
                'fechaBaja' => $request->fechaBaja,
                'idPuesto' => $request->idPuesto,
                'idEstadoEquipo' => $request->idEstadoEquipo,
                'idTipoEquipo' => $request->idTipoEquipo,
            ]);

            // Guardar los datos en la base de datos
            $equipo->save();

            // Retornar la respuesta con el Equipo creado
            return response()->json($equipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarEquipo(Request $request, $idEquipo)
    {
        try {
            // Buscar el Equipo existente por su ID
            $equipo = Equipo::find($idEquipo);
            if (!$equipo) {
                abort(404, 'Equipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'nombre' => 'nullable|string|max:100',
                'marca' => 'nullable|string|max:100',
                'modelo' => 'nullable|string|max:100',
                'numeroSerie' => 'nullable|string|max:255',
                'descripcion' => 'nullable|string|max:255',
                'fechaAlta' => 'nullable|date_format:Y-m-d',
                'fechaBaja' => 'nullable|date_format:Y-m-d',
                'idEstadoEquipo' => 'required|exists:estado_equipos,idEstadoEquipo',
                'idPuesto' => 'required|exists:puestos,idPuesto',
                'idTipoEquipo' => 'required|exists:tipo_equipos,idTipoEquipo',
            ]);

            // Actualizar los campos del Equipo con los datos proporcionados
            $equipo->nombre = $request->nombre;
            $equipo->marca = $request->marca;
            $equipo->modelo = $request->modelo;
            $equipo->numeroSerie = $request->numeroSerie;
            $equipo->descripcion = $request->descripcion;
            $equipo->fechaAlta = $request->fechaAlta;
            $equipo->fechaBaja = $request->fechaBaja;
            $equipo->idEstadoEquipo = $request->idEstadoEquipo;
            $equipo->idPuesto = $request->idPuesto;
            $equipo->idTipoEquipo = $request->idTipoEquipo;
            // Guardar los cambios en la base de datos
            $equipo->save();

            // Retornar la respuesta con el tipoEquipo creado
            return response()->json($equipo, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
