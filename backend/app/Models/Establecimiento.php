<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Establecimiento extends Model
{
    use HasFactory;
    protected $primaryKey = 'idEstablecimiento';
    protected $table = 'establecimientos';
    protected $fillable = [
        'nombre', 'calle', 'altura', 'telefono', 'correo', 'cuit', 'descripcion',  'sitioweb',
        'idPais', 'idProvincia', 'idLocalidad'
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


}
