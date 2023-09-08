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
        Schema::create('incidente_agenda', function (Blueprint $table) {
            $table->bigIncrements('idIncidenteAgenda');
            $table->unsignedBigInteger('idIncidente');
            $table->date('fechaAgenda')->nullable();
            $table->time('horarioInicio')->nullable();
            $table->time('horarioFin')->nullable();
            $table->foreign('idIncidente')->references('idIncidente')->on('incidentes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidentes_agenda');
    }
};
