<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puesto extends Model
{
    use HasFactory;

    protected $primaryKey = 'idPuesto';
    protected $table = 'puestos';
    protected $fillable = [
        'puestoRed', 'telefono', 'descripcion', 'idSector',
    ];

    public function sectores()
    {
        return $this->belongsTo(Sector::class, 'idSector', 'idSector');
    }

    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'idPuesto', 'idPuesto');
    }
}
