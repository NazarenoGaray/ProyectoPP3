<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoComentario extends Model
{
    use HasFactory;

    protected $primaryKey = 'idTipoComentario';
    protected $table = 'tipo_comentarios';

    protected $fillable = [
        'descripcion',
    ];
}
