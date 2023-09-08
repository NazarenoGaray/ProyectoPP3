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
        Schema::create('incidentes', function (Blueprint $table) {
            $table->bigIncrements('idIncidente');
            $table->unsignedBigInteger('idEstablecimiento');
            $table->unsignedBigInteger('idSector');
            $table->unsignedBigInteger('idPrioridadIncidente');
            $table->unsignedBigInteger('idCategoriaIncidente');
            $table->unsignedBigInteger('idEstadoIncidente');
            $table->string('titulo', 80);
            $table->text('descripcion');
            $table->dateTime('fechaInicio');
            $table->dateTime('fechaCierre')->nullable();
            $table->foreign('idEstablecimiento')->references('idEstablecimiento')->on('establecimientos');
            $table->foreign('idSector')->references('idSector')->on('sectores');
            $table->foreign('idPrioridadIncidente')->references('idPrioridadIncidente')->on('prioridad_incidentes');
            $table->foreign('idCategoriaIncidente')->references('idCategoriaIncidente')->on('categoria_incidentes');
            $table->foreign('idEstadoIncidente')->references('idEstadoIncidente')->on('estado_incidentes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidentes');
    }
};
