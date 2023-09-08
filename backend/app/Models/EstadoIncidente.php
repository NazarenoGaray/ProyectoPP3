<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoIncidente extends Model
{
    use HasFactory;

    protected $primaryKey = 'idEstadoIncidente';
    protected $table = 'estado_incidentes';

    protected $fillable = [
        'descripcion',
    ];
}
