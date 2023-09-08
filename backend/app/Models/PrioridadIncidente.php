<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrioridadIncidente extends Model
{
    use HasFactory;

    protected $primaryKey = 'idPrioridadIncidente';
    protected $table = 'prioridad_incidentes';

    protected $fillable = [
        'descripcion',
    ];
}
