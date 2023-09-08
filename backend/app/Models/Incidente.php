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
        'idPrioridadIncidente', 'idCategoriaIncidente', 'idEstadoIncidente'
        ,'titulo','descripcion', 'fechaCierre', 'fechaInicio',
        'idEstablecimiento', 'idSector'
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
}
