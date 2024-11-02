<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidente extends Model
{
    use HasFactory;

    protected $primaryKey = 'idIncidente';
    protected $table = 'incidentes';

    protected $fillable = [
        'idEstablecimiento', 'idSector',
        'idPrioridadIncidente', 'idCategoriaIncidente', 'idEstadoIncidente',
        'descripcion', 'tarea', 'fechaInicio', 'fechaCierre',
    ];

    public function establecimientos()
    {
        return $this->belongsTo(Establecimiento::class, 'idEstablecimiento');
    }

    public function sectores()
    {
        return $this->belongsTo(Sector::class, 'idSector');
    }

    public function PrioridadIncidente()
    {
        return $this->belongsTo(PrioridadIncidente::class, 'idPrioridadIncidente');
    }
    public function CategoriaIncidente()
    {
        return $this->belongsTo(CategoriaIncidente::class, 'idCategoriaIncidente');
    }
    public function EstadoIncidente()
    {
        return $this->belongsTo(EstadoIncidente::class, 'idEstadoIncidente');
    }
    //funciones para declarar relaciones
    public function equipos()
    {
        return $this->belongsToMany(Equipo::class, 'incidente_equipos', 'idIncidente', 'idEquipo');
    }

    public function usuarios()
    {
        return $this->belongsToMany(Usuario::class, 'incidente_usuarios', 'idIncidente', 'idUsuario');
    }
}
