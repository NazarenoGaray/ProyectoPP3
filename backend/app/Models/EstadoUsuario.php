<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoUsuario extends Model
{
    use HasFactory;
    protected $primaryKey = 'idEstadoUsuario';
    protected $table = 'estado_usuarios';

    protected $fillable = [
        'descripcion'
    ];
}
