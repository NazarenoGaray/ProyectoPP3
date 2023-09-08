<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;
    protected $primaryKey = 'idEquipo';
    protected $table = 'equipos';

    protected $fillable = [
        'nombre', 'marca', 'modelo',
        'numeroSerie', 'descripcion',
        'fechaAlta', 'fechaBaja',
        'idEstadoEquipo', 'idPuesto', 'idTipoEquipo'

    ];


    public function puestos()
    {
        return $this->belongsTo(Puesto::class, 'idPuesto', 'idPuesto');
    }

    public function tipoEquipo()
    {
        return $this->belongsTo(TipoEquipo::class, 'idTipoEquipo', 'idTipoEquipo');
    }
    public function estadoEquipo()
    {
        return $this->belongsTo(EstadoEquipo::class, 'idEstadoEquipo', 'idEstadoEquipo');
    }

}
