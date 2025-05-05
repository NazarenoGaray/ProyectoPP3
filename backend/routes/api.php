<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\DireccionController;
use App\Http\Controllers\EstablecimientoController;
use App\Http\Controllers\HorarioEstablecimientoController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\PuestoController;
use App\Http\Controllers\EstadoUsuarioController;
use App\Http\Controllers\EstadoEquipoController;
use App\Http\Controllers\TipoEquipoController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\CategoriaIncidenteController;
use App\Http\Controllers\ComentariosIncidenteController;
use App\Http\Controllers\EstadoIncidenteController;
use App\Http\Controllers\IncidenteController;
use App\Http\Controllers\PrioridadIncidenteController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\IncidenteAgendaController;
use App\Http\Controllers\IncidenteUsuarioController;
use App\Http\Controllers\TipoComentarioController;
use App\Http\Controllers\IncidenteEquipoController;
use App\Http\Controllers\IniciarSesionController;
use App\Http\Controllers\EstadisticasController;
use App\Http\Controllers\RenovarTokenController;

//Iniciar Sesion
Route::post('/iniciar-sesion', [IniciarSesionController::class, 'iniciarSesion']);
//Renovar Token
Route::post('/renovar-token', [RenovarTokenController::class, 'renovarToken']);//->middleware('auth:api');

// Obtener los Paises
Route::get('/paises', [DireccionController::class, 'obtenerTodosPaises']);
// Obtener provincias por ID de país
Route::get('/provincias/{idPais}', [DireccionController::class, 'obtenerProvinciasPorPais']);
// Obtener localidades por ID de provincia
Route::get('/localidades/{idProvincia}', [DireccionController::class, 'obtenerLocalidadesPorProvincia']);

// Obtener los horarios de un establecimiento
Route::get('/establecimientos/{idEstablecimiento}/horarios', [HorarioEstablecimientoController::class, 'obtenerHorariosDelEstablecimiento']);
// Agregar un horario a un establecimiento
Route::post('/establecimientos/{idEstablecimiento}/horarios', [HorarioEstablecimientoController::class, 'agregarHorarioAlEstablecimiento']);
// Editar un horario de un establecimiento
Route::put('/horarios/{idHorario}', [HorarioEstablecimientoController::class, 'editarHorarioAlEstablecimiento']);


// Obtener todos los usuarios
Route::get('/usuarios', [UsuarioController::class, 'obtenerUsuarios']);
// Obtener todos los usuarios filtrados
Route::post('/usuarios/buscar', [UsuarioController::class, 'buscarUsuario']);
// Obtener un usuarios por id
Route::get('/usuarios/{idUsuario}', [UsuarioController::class, 'usuarioPorId']);
// Crear un nuevo usuario
Route::post('/usuarios', [UsuarioController::class, 'crearUsuario']);
// Actualizar un Usuario existente
Route::put('/usuarios/{idUsuario}', [UsuarioController::class, 'editarUsuario']);
//Cambiar clave
Route::post('/cambiar-clave', [UsuarioController::class,'cambiarClave']);

// Obtener todos los establecimientos
Route::get('/establecimientos', [EstablecimientoController::class, 'obtenerEstablecimientos']);
// Obtener un establecimientos por id
Route::get('/establecimientos/{idEstablecimiento}', [EstablecimientoController::class, 'establecimientoPorId']);
// Crear un nuevo establecimiento
Route::post('/establecimientos', [EstablecimientoController::class, 'crearEstablecimiento']);
// Actualizar un Establecimiento existente
Route::put('/establecimientos/{idEstablecimiento}', [EstablecimientoController::class, 'actualizarEstablecimiento']);

// Obtener todos los Sectores de un Establecimiento
Route::get('/establecimientos/{idEstablecimiento}/sectores', [EstablecimientoController::class, 'obtenerSectoresDeUnEstablecimiento']);


// Obtener todos los sectores
Route::get('/sectores', [SectorController::class, 'obtenerSectores']);
// Obtener un sectores por id
Route::get('/sectores/{idSector}', [SectorController::class, 'obtenerSectorPorId']);
// Crear un nuevo sector a un establecimiento
Route::post('/sectores', [SectorController::class, 'crearSector']);
// Actualizar un sectores existente
Route::put('/sectores/{idSector}', [SectorController::class, 'editarSector']);


// Obtener todos los puestos de un sector
// Route::get('/sectores/{idSector}/puestosyequipos', [SectorController::class, 'obtenerPuestosYEquiposDeUnSector']);

Route::get('/sectores/{idSector}/puestos', [SectorController::class, 'obtenerPuestosDeUnSector']);
Route::get('/sectores/{idSector}/equipos', [SectorController::class, 'obtenerEquiposDeUnSector']);

// Obtener todos los puestos
Route::get('/puestos', [PuestoController::class, 'obtenerPuestos']);
// Obtener puesto por idPuesto
Route::get('/puestos/{idPuesto}', [PuestoController::class, 'obtenerPuestoPorId']);
// Crear un puesto nuevo
Route::post('/puestos', [PuestoController::class, 'crearPuesto']);
// Actualizar un puestos existente
Route::put('/puestos/{idPuesto}', [PuestoController::class, 'editarPuesto']);

// Obtener Equipos de un Puesto
Route::get('/puestos/{idPuesto}/equipos', [PuestoController::class, 'obtenerEquiposDeUnPuesto']);


// Obtener todos los estados de los usuarios
Route::get('/estadoUsuario', [EstadoUsuarioController::class, 'obtenerEstadosUsuario']);
// Obtener estadoUsuario
Route::get('/estadoUsuario/{idEstadoUsuario}', [EstadoUsuarioController::class, 'obtenerEstadoUsuarioPorId']);
// Crear un estados nuevo del Usuario
Route::post('/estadoUsuario', [EstadoUsuarioController::class, 'crearEstadoUsuario']);
// Actualizar un estado del Usuario existente
Route::put('/estadoUsuario/{idEstadoUsuario}', [EstadoUsuarioController::class, 'editarEstadoUsuario']);



// Obtener todos los estados de los equipos
Route::get('/estadoEquipo', [EstadoEquipoController::class, 'obtenerEstadosEquipo']);
// Obtener estadoEquipo
Route::get('/estadoEquipo/{idEstadoEquipo}', [EstadoEquipoController::class, 'obtenerEstadoEquipoPorId']);
// Crear un estados nuevo del Equipo
Route::post('/estadoEquipo', [EstadoEquipoController::class, 'crearEstadoEquipo']);
// Actualizar un estado del Equipo existente
Route::put('/estadoEquipo/{idEstadoEquipo}', [EstadoEquipoController::class, 'editarEstadoEquipo']);


// Obtener todos los tipos Equipo
Route::get('/tipoEquipo', [TipoEquipoController::class, 'obtenerTipoEquipos']);
// Obtener estadoEquipo
Route::get('/tipoEquipo/{idTipoEquipo}', [TipoEquipoController::class, 'obtenerTipoEquipoPorId']);
// Crear un estados nuevo del Equipo
Route::post('/tipoEquipo', [TipoEquipoController::class, 'crearTipoEquipo']);
// Actualizar un estado del Equipo existente
Route::put('/tipoEquipo/{idTipoEquipo}', [TipoEquipoController::class, 'editarTipoEquipo']);


// Obtener todos los Equipos
Route::get('/equipos', [EquipoController::class, 'obtenerEquipos']);
// Obtener estadoEquipo
Route::get('/equipos/{idEquipo}', [EquipoController::class, 'obtenerEquipoPorId']);
// Crear un nuevo del Equipo
Route::post('/equipos', [EquipoController::class, 'crearEquipo']);
// Actualizar un Equipo existente
Route::put('/equipos/{idEquipo}', [EquipoController::class, 'editarEquipo']);
// Obtener historial Equipo
Route::get('/equipos/{idEquipo}/historial', [EquipoController::class, 'obtenerHistorialComentariosEquipo']);

// Obtener todas las Categorias de los incidentes
Route::get('/categorias', [CategoriaIncidenteController::class, 'obtenerCategoriasIncidente']);
// Obtener una Categoria especifica por su id
Route::get('/categorias/{idCategoriaIncidente}', [CategoriaIncidenteController::class, 'obtenerCategoriaIncidentePorId']);
// Crear un nueva Categoria
Route::post('/categorias', [CategoriaIncidenteController::class, 'crearCategoriaIncidente']);
// Actualizar un Categoria existente
Route::put('/categorias/{idCategoriaIncidente}', [CategoriaIncidenteController::class, 'editarCategoriaIncidente']);


// Obtener todos los estados de los Incidentes
Route::get('/estadosIncidente', [EstadoIncidenteController::class, 'obtenerEstadosIncidente']);
// Obtener una estadosIncidente especifica por su id
Route::get('/estadosIncidente/{idEstadoIncidente}', [EstadoIncidenteController::class, 'obtenerEstadoIncidentePorId']);
// Crear un nueva estadosIncidente
Route::post('/estadosIncidente', [EstadoIncidenteController::class, 'crearEstadoIncidente']);
// Actualizar un estadosIncidente existente
Route::put('/estadosIncidente/{idEstadoIncidente}', [EstadoIncidenteController::class, 'editarEstadoIncidente']);


// Obtener todas las prioridades de los incidentes
Route::get('/prioridadIncidentes', [PrioridadIncidenteController::class, 'obtenerPrioridadIncidente']);
// Obtener una prioridad especifica por su id
Route::get('/prioridadIncidentes/{idPrioridadIncidente}', [PrioridadIncidenteController::class, 'obtenerPrioridadIncidentePorId']);
// Crear prioridad Incidentes
Route::post('/prioridadIncidentes', [PrioridadIncidenteController::class, 'crearPrioridadIncidente']);
// Actualizar prioridad-Incidentes existente
Route::put('/prioridadIncidentes/{idPrioridadIncidente}', [PrioridadIncidenteController::class, 'editarPrioridadIncidente']);


// Obtener todos los incidentes
Route::post('/incidentes/buscar', [IncidenteController::class, 'buscar']);

Route::get('/incidentes', [IncidenteController::class, 'obtenerIncidentes']);
// Obtener un incidente especifica por su id
Route::get('/incidentes/{idIncidente}', [IncidenteController::class, 'obtenerIncidentePorId']);
// Crear incidente
Route::post('/incidentes', [IncidenteController::class, 'crearIncidente']);
// Actualizar incidente existente
Route::put('/incidentes/{idIncidente}', [IncidenteController::class, 'editarIncidente']);
// Obtener Equipos de un Incidente
Route::get('/incidentes/{idIncidente}/equipos', [IncidenteEquipoController::class, 'obtenerEquiposDeUnIncidente']);
// Obtener Incidentes de un Establecimiento
Route::get('/incidentes/{idEstablecimiento}/establecimiento', [IncidenteController::class, 'obtenerIncidentesPorEstablecimiento']);

Route::get('/usuario/{idUsuario}/incidentes/{fecha}', [IncidenteAgendaController::class, 'obtenerIncidentesPorUsuarioYFecha']);

// Obtener todos los incidentes Agenda
Route::get('/incidentesAgenda', [IncidenteAgendaController::class, 'obtenerIncidenteAgendados']);
// Obtener un incidente Agenda especifica por su id
Route::get('/incidentesAgenda/{idIncidenteAgenda}', [IncidenteAgendaController::class, 'obtenerIncidentesDeUnUsuario']);
// Crear incidente Agenda
Route::post('/incidentesAgenda', [IncidenteAgendaController::class, 'crearincidenteAgenda']);
// Actualizar incidentes Agenda existente
Route::put('/incidentesAgenda/{idIncidenteAgenda}', [IncidenteAgendaController::class, 'editarIncidenteAgenda']);


// Obtener todos los Roles
Route::get('/roles', [RolesController::class, 'obtenerRoles']);
// Obtener un Rol especifica por su id
Route::get('/roles/{idRol}', [RolesController::class, 'obtenerRolPorId']);
// Crear Rol
Route::post('/roles', [RolesController::class, 'crearRol']);
// Actualizar Rol existente
Route::put('/roles/{idRol}', [RolesController::class, 'editarRol']);


// Obtener todos los tipoComentario
Route::get('/tipoComentario', [TipoComentarioController::class, 'obtenerTipoComentario']);
// Obtener un tipoComentario especifica por su id
Route::get('/tipoComentario/{idTipoComentario}', [TipoComentarioController::class, 'obtenerTipoComentarioPorId']);
// Crear tipoComentario
Route::post('/tipoComentario', [TipoComentarioController::class, 'crearTipoComentario']);
// Actualizar tipoComentario existente
Route::put('/tipoComentario/{idTipoComentario}', [TipoComentarioController::class, 'editarTipoComentario']);


// Obtener todos los comentariosIncidente
Route::get('/comentariosIncidente', [ComentariosIncidenteController::class, 'obtenerComentariosIncidente']);
// Crear comentariosIncidente
Route::post('/comentariosIncidente', [ComentariosIncidenteController::class, 'crearComentarioIncidente']);
// Actualizar comentariosIncidente existente
Route::put('/comentariosIncidente/{idTipoComentario}', [ComentariosIncidenteController::class, 'editarComentarioIncidente']);
// Obtener todos los comentarios por Incidente
Route::get('/comentariosPorIncidente/{idIncidente}', [ComentariosIncidenteController::class, 'obtenerComentariosPoridIncidente']);


Route::get('/incidenteUsuarios', [IncidenteUsuarioController::class, 'obtenerUsuariosDeLosIncidentes']);
// Route::get('/incidenteUsuarios/incidente/{idIncidente}', [IncidenteUsuarioController::class, 'obtenerUsuariosDeUnIncidente']);
// Obtener Usuarios de un Incidente - usuarios asignados a un incidente
Route::get('/incidentes/{idIncidente}/usuarios', [IncidenteUsuarioController::class, 'obtenerUsuariosDeUnIncidente']);
// Obtener Los Incidentes de un Usuario - Ver su actividad
Route::get('/usuarios/{idUsuario}/incidentes', [IncidenteUsuarioController::class, 'obtenerIncidentesDeUnUsuario']);


Route::post('/incidenteUsuarios', [IncidenteUsuarioController::class, 'crearOEditarIncidenteUsuario']); // Ruta para crear o editar
Route::put('/incidenteUsuarios/{idIncidente}/{idUsuario}', [IncidenteUsuarioController::class, 'editarIncidenteUsuario']);

// Estadisticas - Incidentes Por Fecha
Route::get('/estadisticas/incidentesPorFecha', [EstadisticasController::class, 'incidentesPorFecha']);
// Estadisticas - Establecimientos Con Mas Incidencias
Route::get('/estadisticas/establecimientosConMasIncidencias', [EstadisticasController::class, 'establecimientosConMasIncidencias']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
