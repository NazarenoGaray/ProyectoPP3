<?php

namespace App\Http\Controllers;

use App\Models\HorarioEstablecimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HorarioEstablecimientoController extends Controller
{
    // Método para mostrar todos los horarios de un establecimiento
    public function obtenerHorariosDelEstablecimiento($idEstablecimiento)
    {
        $horarios = HorarioEstablecimiento::where('idEstablecimiento', $idEstablecimiento)
            ->orderBy('diaSemana')
            ->orderBy('horaEntrada')
            ->get();

        if ($horarios->isEmpty()) {
            return response()->json(['message' => 'No se encontraron horarios para este establecimiento'], 404);
        }

        return response()->json($horarios, 200);
    }

    public function agregarHorarioAlEstablecimiento(Request $request, $idEstablecimiento)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'diaSemana' => 'required|integer|min:1|max:7', // Día de la semana válido
                'horaEntrada' => 'required|date_format:H:i:s', // Formato de hora válido
                'horaSalida' => 'required|date_format:H:i:s', // Formato de hora válido
            ]);

            // Crea la nueva instancia de HorarioEstablecimiento con los datos validados
            $horarioEstablecimiento = new HorarioEstablecimiento([
                'idEstablecimiento' => $idEstablecimiento, // Asignar el idEstablecimiento correctamente
                'diaSemana' => $request->diaSemana,
                'horaEntrada' => $request->horaEntrada,
                'horaSalida' => $request->horaSalida,
            ]);

            // Guardar los datos en la base de datos
            $horarioEstablecimiento->save();

            // Retornar la respuesta con el horario Establecimiento creado
            return response()->json($horarioEstablecimiento, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function editarHorarioAlEstablecimiento(Request $request, $idHorario)
    {
        try {
            // Buscar el horario existente por su ID
            $horario = HorarioEstablecimiento::find($idHorario);
            if (!$horario) {
                abort(404, 'Horario no encontrado');
            }

            // Valida los datos recibidos del formulario
            $request->validate([
                'diaSemana' => 'required|integer|min:1|max:7', // Día de la semana válido
                'horaEntrada' => 'required|date_format:H:i:s', // Formato de hora válido
                'horaSalida' => 'required|date_format:H:i:s', // Formato de hora válido
            ]);

            // Actualizar los campos del horario con los datos proporcionados
            $horario->diaSemana = $request->diaSemana;
            $horario->horaEntrada = $request->horaEntrada;
            $horario->horaSalida = $request->horaSalida;

            // Guardar los cambios en la base de datos
            $horario->save();

            // Retornar la respuesta con el horario actualizado
            return response()->json($horario, 200);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            Log::info('error:',['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
