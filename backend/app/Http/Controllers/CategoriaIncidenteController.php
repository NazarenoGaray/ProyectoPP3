<?php

namespace App\Http\Controllers;

use App\Models\CategoriaIncidente;
use Illuminate\Http\Request;

class CategoriaIncidenteController extends Controller
{
    // Método para mostrar todas las categorias de los incidentes
    public function obtenerCategoriasIncidente()
    {
        try {
            // Obtener todas las categorias de los incidentes
            $categoriasIncidente = CategoriaIncidente::all();
            // Ocultar campos específicos de la tabla 'categoria_incidentes'
            $categoriasIncidente->makeHidden(['created_at', 'updated_at']);

            // Retornar la respuesta creada
            return response()->json($categoriasIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para mostrar detalles de una categoria específica
    public function obtenerCategoriaIncidentePorId($idCategoriaIncidente)
    {
        $categoriasIncidente = CategoriaIncidente::all()->find($idCategoriaIncidente);;

        // Ocultar campos específicos de la tabla 'categoria_incidentes'
        $categoriasIncidente->makeHidden(['created_at', 'updated_at']);

        if (!$categoriasIncidente) {
            abort(404, 'Categorias de los Incidentes no encontradas');
        }
        return response()->json($categoriasIncidente, 200);
    }

    public function crearCategoriaIncidente(Request $request)
    {
        try {
            // Valida los datos recibidos del formulario
            $request->validate([
                'descripcion' => 'required|string|max:255',
            ]);

            // Crea la nueva disciplina con los datos validados
            $categoriaIncidente = new CategoriaIncidente([
                'descripcion' => $request->descripcion,
            ]);

            // Guardar los datos en la base de datos
            $categoriaIncidente->save();

            // Retornar la respuesta con el categoriaIncidente creado
            return response()->json($categoriaIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editarCategoriaIncidente(Request $request, $idCategoriaIncidente)
    {
        try {
            // Buscar el categoriaIncidente existente por su ID
            $categoriaIncidente = CategoriaIncidente::find($idCategoriaIncidente);
            if (!$categoriaIncidente) {
                abort(404, 'Estado del Equipo no encontrado');
            }

            // Validar los datos recibidos en la solicitud
            $request->validate([
                'descripcion' => 'required|string|max:255',

            ]);
            // Actualizar los campos del categoriaIncidente con los datos proporcionados
            $categoriaIncidente->descripcion = $request->descripcion;

            // Guardar los cambios en la base de datos
            $categoriaIncidente->save();

            // Retornar la respuesta con el categoriaIncidente creado
            return response()->json($categoriaIncidente, 201);
        } catch (\Exception $e) {
            // Capturar cualquier excepción y mostrar el mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
