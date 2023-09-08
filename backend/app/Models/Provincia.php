<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    protected $primaryKey = 'idProvincia';
    protected $table = 'provincias';
    public $timestamps = false;

    public function pais()
    {
        return $this->belongsTo(Pais::class, 'idPais', 'idPais');
    }

    public function localidades()
    {
        return $this->hasMany(Localidad::class, 'idProvincia', 'idProvincia');
    }
}
