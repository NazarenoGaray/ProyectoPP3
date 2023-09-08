<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    use HasFactory;
    protected $primaryKey = 'idSector';
    protected $table = 'sectores';
    protected $fillable = [
        'nombre', 'ubicacion', 'idEstablecimiento'
    ];

    public function establecimiento()
    {
        return $this->belongsTo(Establecimiento::class, 'idEstablecimiento', 'idEstablecimiento');
    }


}
