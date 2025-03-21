<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoEquipo extends Model
{
    use HasFactory;

    protected $primaryKey = 'idTipoEquipo';
    protected $table = 'tipo_equipos';

    protected $fillable = [
        'descripcion',
    ];

}
