<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Incidente;
use Illuminate\Http\Request;

class IncidenteController extends Controller
{
    // Método para mostrar todos los incidentes
    public function obtenerIncidentes()
    {
        try {
            $incidentes = Incidente::with([
                'establecimientos:idEstablecimiento,nombre',
                'sectores:idSector,nombre',
                'PrioridadIncidente:idPrioridadIncidente,descripcion',
                'CategoriaIncidente:idCategoriaIncidente,descripcion',
                'EstadoIncidente:idEstadoIncidente,descripcion',
            ])->get();

            // Ocultar campos específicos de la tabla 'incidentes'
            $incidentes->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta con el Incidente creado
            return response()->json($incidentes, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un incidente específico
    public function obtenerIncidentePorId($idIncidente)
    {
        $incidente = Incidente::with(
            'establecimientos:idEstablecimiento,nombre,calle,altura',
            'sectores:idSector,nombre',
            'PrioridadIncidente:idPrioridadIncidente,descripcion',
            'CategoriaIncidente:idCategoriaIncidente,descripcion',
            'EstadoIncidente:idEstadoIncidente,descripcion',
        )->find($idIncidente);;

        // Ocultar campos específicos de la tabla 'incidente'
        $incidente->makeHidden(['created_at', 'updated_at']);

        if (!$incidente) {
            abort(404, 'Incidente no encontrado');
        }
        return response()->json($incidente, 200);
    }
    // public function buscar(Request $request){

    //     $id = $request->id;
    //     $establecimiento = $request->establecimiento;
    //     $estado = $request->estado;
    //     $categoria = $request->categoria;
    //     $prioridad = $request->prioridad;

    //     $incidentes = Incidente::with([
    //         'establecimientos:idEstablecimiento,nombre',
    //         'PrioridadIncidente:idPrioridadIncidente,descripcion',
    //         'EstadoIncidente:idEstadoIncidente,descripcion',
    //         'CategoriaIncidente:idCategoriaIncidente,descripcion',

    //     ])->where(function ($queryBuilder) use($id) {
    //         $queryBuilder->where('idIncidente', $id) // Filtrar por idIncidente exacto
    //             ->orWhereHas('establecimientos', function ($subQuery) use ($establecimiento) {
    //                 $subQuery->where('nombre', 'like', '%' . $query . '%');
    //             })
    //             ->orWhereHas('PrioridadIncidente', function ($subQuery) use ($prioridad) {
    //                 $subQuery->where('descripcion', 'like', '%' . $prioridad . '%');
    //             })
    //             ->orWhereHas('EstadoIncidente', function ($subQuery) use ($estado) {
    //                 $subQuery->where('descripcion', 'like', '%' . $estado . '%');
    //             })
    //             ->orWhereHas('CategoriaIncidente', function ($subQuery) use ($categoria) {
    //                 $subQuery->where('descripcion', 'like', '%' . $categoria . '%');
    //             });
    //     })->get();

 

        // Retornar la respuesta JSON con los resultados de la búsqueda

    //     return response()->json($incidentes, 200);

    // }
    public function crearIncidente(Request $request)
    {
        try {
            // Validar los datos recibidos en la solicitud
            $request->validate([
                'idEstablecimiento' => 'required|exists:establecimientos,idEstablecimiento',
                'idSector' => 'required|exists:sectores,idSector',
                'idPrioridadIncidente' => 'required|exists:prioridad_incidentes,idPrioridadIncidente',
                'idCategoriaIncidente' => 'required|exists:categoria_incidentes,idCategoriaIncidente',
                'idEstadoIncidente' => 'required|exists:estado_incidentes,idEstadoIncidente',
                'titulo' => 'required|string',
                'descripcion' => 'required|string|max:80',
                'fechaInicio'=> 'nullable|date_format:Y-m-d H:i:s',
                'fechaCierre'=> 'nullable|date_format:Y-m-d H:i:s',
            ]);

            // Crear el nuevo incidente con los datos proporcionados
            $incidente = new Incidente([
                'idEstablecimiento' => $request->idEstablecimiento,
                'idSector' => $request->idSector,
                'idPrioridadIncidente' => $request->idPrioridadIncidente,
                'idCategoriaIncidente' => $request->idCategoriaIncidente,
                'idEstadoIncidente' => $request->idEstadoIncidente,
                'descripcion' => $request->descripcion,
                'titulo' => $request->titulo,
                'fechaInicio'=> $request->fechaInicio,
                'fechaCierre'=> $request->fechaCierre,
            ]);
            
            // Guardar el incidente en la base de datos
            $incidente->save();


            $incidente->equipos()->attach($request->idEquipos);
            $incidente->usuarios()->attach($request->idUsuarios);


            // Retornar la respuesta con el incidente creado
            return response()->json($incidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function editarIncidente(Request $request, $idIncidente)
    {
        try {
            // Buscar el incidente existente por su ID
            $incidente = Incidente::find($idIncidente);
            if (!$incidente) {
                abort(404, 'incidente no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'idEstablecimiento' => 'required|exists:establecimientos,idEstablecimiento',
                'idSector' => 'required|exists:sectores,idSector',
                'idPrioridadIncidente' => 'required|exists:prioridad_incidentes,idPrioridadIncidente',
                'idCategoriaIncidente' => 'required|exists:categoria_incidentes,idCategoriaIncidente',
                'idEstadoIncidente' => 'required|exists:estado_incidentes,idEstadoIncidente',

                'titulo' => 'required|string|max:80',
                'tarea' => 'required|string',
                'fechaInicio' => 'required|date_format:Y-m-d H:i:s',
                'fechaCierre' => 'nullable|date_format:Y-m-d H:i:s',
            ]);

            // Actualizar los campos del incidente con los datos proporcionados
            $incidente->idEstablecimiento = $request->idEstablecimiento;
            $incidente->idSector = $request->idSector;
            $incidente->idPrioridadIncidente = $request->idPrioridadIncidente;
            $incidente->idCategoriaIncidente = $request->idCategoriaIncidente;
            $incidente->idEstadoIncidente = $request->idEstadoIncidente;
            $incidente->titulo = $request->titulo;
            $incidente->tarea = $request->tarea;
            $incidente->fechaInicio = $request->fechaInicio;
            $incidente->fechaCierre = $request->fechaCierre;

            // Guardar los cambios en la base de datos
            $incidente->save();

            // Retornar la respuesta con el incidente creado
            return response()->json($incidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function buscar(Request $request) {
        // Obtener los valores de búsqueda desde la solicitud
        $id = $request->id;
        $establecimiento = $request->establecimiento;
        $estado = $request->estado;
        $categoria = $request->categoria;
        $prioridad = $request->prioridad;
    
        // Crear una consulta base con las relaciones
        $query = Incidente::with([
            'establecimientos:idEstablecimiento,nombre',
            'PrioridadIncidente:idPrioridadIncidente,descripcion',
            'EstadoIncidente:idEstadoIncidente,descripcion',
            'CategoriaIncidente:idCategoriaIncidente,descripcion',
        ]);
    
        // Aplicar filtros según los valores proporcionados
        if (!empty($id)) {
            $query->where('idIncidente', $id);
        }
    
        if (!empty($establecimiento)) {
            $query->whereHas('establecimientos', function ($subQuery) use ($establecimiento) {
                $subQuery->where('nombre', 'like', '%' . $establecimiento . '%');
            });
        }
    
        if (!empty($prioridad)) {
            $query->whereHas('PrioridadIncidente', function ($subQuery) use ($prioridad) {
                $subQuery->where('descripcion', 'like', '%' . $prioridad . '%');
            });
        }
    
        if (!empty($estado)) {
            $query->whereHas('EstadoIncidente', function ($subQuery) use ($estado) {
                $subQuery->where('descripcion', 'like', '%' . $estado . '%');
            });
        }
    
        if (!empty($categoria)) {
            $query->whereHas('CategoriaIncidente', function ($subQuery) use ($categoria) {
                $subQuery->where('descripcion', 'like', '%' . $categoria . '%');
            });
        }
    
        // Ejecutar la consulta y obtener los incidentes filtrados
        $incidentes = $query->get();
    
        return response()->json($incidentes);
    }
    
}
