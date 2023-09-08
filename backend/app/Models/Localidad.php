<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Localidad extends Model
{
    protected $primaryKey = 'idLocalidad';
    protected $table = 'localidades';
    public $timestamps = false;

    public function provincia()
    {
        return $this->belongsTo(Provincia::class, 'idProvincia', 'idProvincia');
    }
}
