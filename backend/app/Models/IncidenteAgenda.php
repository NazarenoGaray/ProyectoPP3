<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidenteAgenda extends Model
{
    use HasFactory;
    protected $primaryKey = 'idIncidenteAgenda';
    protected $table = 'incidente_agenda';

    protected $fillable = [
        'idIncidente',
        'fechaAgenda',
        'horarioInicio',
        'horarioFin',
    ];

    public function incidentes()
    {
        return $this->belongsTo(Incidente::class, 'idIncidente');
    }

}
