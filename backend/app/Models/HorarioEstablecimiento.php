<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorarioEstablecimiento extends Model
{
    use HasFactory;
    protected $primaryKey = 'idHorario';
    protected $table = 'horarios_establecimiento';
    protected $fillable = [
        'idEstablecimiento', 'diaSemana', 'horaEntrada', 'horaSalida'
    ];

    public function establecimiento()
    {
        return $this->belongsTo(Establecimiento::class, 'idEstablecimiento', 'idEstablecimiento');
    }
}
