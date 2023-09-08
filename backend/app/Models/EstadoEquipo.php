<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoEquipo extends Model
{
    use HasFactory;
    protected $primaryKey = 'idEstadoEquipo';
    protected $table = 'estado_equipos';
    protected $fillable = [
        'descripcion'
    ];
}
