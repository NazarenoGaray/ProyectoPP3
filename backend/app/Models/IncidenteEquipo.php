<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidenteEquipo extends Model
{
    use HasFactory;
    // Indicar que la tabla no tiene clave primaria incrementable
    public $incrementing = false;

    // Definir las columnas de la clave primaria compuesta
    protected $primaryKey = ['idEquipo', 'idIncidente'];

    // Indicar el tipo de datos de la clave primaria compuesta
    protected $keyType = 'array';

    protected $table = 'incidente_equipos';
    protected $fillable = [
        'idEquipo',
        'idIncidente',
    ];
    public function incidente()
    {
        return $this->belongsTo(Incidente::class, 'idIncidente', 'idIncidente');
    }

    public function equipos()
    {
        return $this->belongsTo(Equipo::class, 'idEquipo', 'idEquipo');
    }

}
