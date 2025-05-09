<?php

namespace App\Http\Controllers;

use App\Models\IncidenteAgenda;
use App\Models\Usuario;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IncidenteAgendaController extends Controller
{
    // Método para mostrar todas los usuarios agendados a un incidente
    public function obtenerIncidenteAgendados()
    {
        try {
            $incidenteAgenda = IncidenteAgenda::all();
            // Ocultar campos específicos de la tabla 'categoria_incidentes'
            $incidenteAgenda->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($incidenteAgenda, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de un incidente-Agenda específico
    public function obtenerIncidenteAgendaPorId($idIncidenteAgenda)
    {
        $incidenteAgenda = IncidenteAgenda::all()->find($idIncidenteAgenda);;

        // Ocultar campos específicos de la tabla 'incidente_agenda'
        $incidenteAgenda->makeHidden(['created_at', 'updated_at']);

        if (!$incidenteAgenda) {
            abort(404, 'incidenteAgenda no encontradas');
        }
        return response()->json($incidenteAgenda, 200);
    }

    public function crearincidenteAgenda(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'idIncidente' => 'required|exists:incidentes,idIncidente',
                'idUsuario' => 'required|exists:usuarios,idUsuario',
                'fechaAgenda' => 'required|date_format:Y-m-d',
                'horarioInicio' => 'required|date_format:H:i',
                'horarioFin' => 'required|date_format:H:i',
            ]);

            // Crea nuevo IncidenteAgenda con los datos validados
            $incidenteAgenda = new IncidenteAgenda([
                'idIncidente' => $request->idIncidente,
                'idUsuario' => $request->idUsuario,
                'fechaAgenda' => $request->fechaAgenda,
                'horarioInicio' => $request->horarioInicio,
                'horarioFin' => $request->horarioFin,
            ]);

            // Guardar los datos en la base de datos
            $incidenteAgenda->save();

            // Retornar la respuesta con el incidenteAgenda creado
            return response()->json($incidenteAgenda, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function quitarDeAgenda($id)
    {
        try {
            $incidenteAgenda = IncidenteAgenda::where('idIncidente', $id)->first();

            if (!$incidenteAgenda) {
                return response()->json(['error' => 'Incidente no encontrado en la agenda'], 404);
            }

            // Eliminar el incidente de la agenda
            $incidenteAgenda->delete();

            return response()->json(['message' => 'Incidente eliminado de la agenda'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function obtenerAgendaDeUsuario($idUsuario)
    {
        $agendas = IncidenteAgenda::with('incidente')->where('idUsuario', $idUsuario)->get();

        if ($agendas->isEmpty()) {
            return response()->json(['error' => 'Agenda vacía'], 404);
        }

        return response()->json($agendas, 200);
    }


    public function obtenerIncidentesPorUsuarioYFecha($idUsuario, $fecha)
    {
        // Obtener el usuario por su ID
        $usuario = Usuario::with(['incidenteUsuario.incidenteAgenda'])
            ->findOrFail($idUsuario);

        // Filtrar los incidentes del usuario en la fecha seleccionada
        $incidentes = $usuario->incidenteUsuario
            ->where('incidenteAgenda.fechaAgenda', $fecha)
            ->pluck('incidenteAgenda');

        return response()->json(['incidentes' => $incidentes]);
    }





    public function editarIncidenteAgenda(Request $request, $idIncidenteAgenda)
    {
        try {
            // Buscar el incidenteAgenda existente por su ID
            $incidenteAgenda = IncidenteAgenda::find($idIncidenteAgenda);
            if (!$incidenteAgenda) {
                abort(404, 'Estado del Equipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'idIncidente' => 'required|exists:incidentes,idIncidente',
                'fechaAgenda' => 'required|date_format:Y-m-d',
                'horarioInicio' => 'required|date_format:H:i:s',
                'horarioFin' => 'required|date_format:H:i:s',

            ]);
            // Actualizar los campos del incidenteAgenda con los datos proporcionados
            $incidenteAgenda->idIncidente = $request->idIncidente;
            $incidenteAgenda->fechaAgenda = $request->fechaAgenda;
            $incidenteAgenda->horarioInicio = $request->horarioInicio;
            $incidenteAgenda->horarioFin = $request->horarioFin;

            // Guardar los cambios en la base de datos
            $incidenteAgenda->save();

            // Retornar la respuesta con el incidenteAgenda creado
            return response()->json($incidenteAgenda, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
