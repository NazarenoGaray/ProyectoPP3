<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'usuarios';
    protected $primaryKey = 'idUsuario';

    protected $fillable = [
        'nombre', 'apellido', 'correo', 'telefono', 'celular',
        'usuario', 'contraseña', 'direccion', 'idEstadoUsuario',
        'idRol', 'idPais', 'idProvincia', 'idLocalidad',
    ];

    public function pais()
    {
        return $this->belongsTo(Pais::class, 'idPais', 'idPais');
    }

    public function provincia()
    {
        return $this->belongsTo(Provincia::class, 'idProvincia', 'idProvincia');
    }

    public function localidad()
    {
        return $this->belongsTo(Localidad::class, 'idLocalidad', 'idLocalidad');
    }

    // Relación con el rol
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'idRol');
    }
    // Relación con el estado de usuario
    public function estado_usuario()
    {
        return $this->belongsTo(EstadoUsuario::class, 'idEstadoUsuario');
    }
}
