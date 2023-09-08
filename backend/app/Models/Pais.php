<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    protected $primaryKey = 'idPais';
    protected $table = 'paises';
    public $timestamps = false;

    public function provincias()
    {
        return $this->hasMany(Provincia::class, 'idPais', 'idPais');
    }
}

