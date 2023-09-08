<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('horarios_establecimiento', function (Blueprint $table) {
            $table->bigIncrements('idHorario');
            $table->unsignedBigInteger('idEstablecimiento');
            $table->unsignedTinyInteger('diaSemana')->nullable(); // 1: lunes, 2: martes, ..., 7: domingo
            $table->time('horaEntrada')->nullable();
            $table->time('horaSalida')->nullable();

            $table->foreign('idEstablecimiento')->references('idEstablecimiento')->on('establecimientos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horarios_establecimiento');
    }
};
