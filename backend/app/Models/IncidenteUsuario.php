<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidenteUsuario extends Model
{
    use HasFactory;

    // Indicar que la tabla no tiene clave primaria incrementable
    public $incrementing = false;

    // Definir las columnas de la clave primaria compuesta
    protected $primaryKey = ['idIncidente', 'idUsuario'];

    // Indicar el tipo de datos de la clave primaria compuesta
    protected $keyType = 'array';

    protected $table = 'incidente_usuarios';
    protected $fillable = [
        'idIncidente', // Añadir 'idIncidente' a los campos rellenables
        'idUsuario',   // Añadir 'idUsuario' a los campos rellenables
        'esObservador',
    ];

    public function incidente()
    {
        return $this->belongsTo(Incidente::class, 'idIncidente', 'idIncidente');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idUsuario', 'idUsuario');
    }
    

}
