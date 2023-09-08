<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComentarioIncidente extends Model
{
    use HasFactory;
    protected $primaryKey = 'idComentario';
    protected $table = 'comentarios_incidente';
    protected $fillable = [
        'comentario', 'fechaHora', 'idUsuario', 'idIncidente', 'idTipoComentario'
    ];
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idUsuario', 'idUsuario');
    }

    public function incidente()
    {
        return $this->belongsTo(Incidente::class, 'idIncidente', 'idIncidente');
    }
    public function tipoComentario()
    {
        return $this->belongsTo(TipoComentario::class, 'idTipoComentario', 'idTipoComentario');
    }

}
