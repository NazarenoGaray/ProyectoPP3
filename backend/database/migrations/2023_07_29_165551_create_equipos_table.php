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
        Schema::create('equipos', function (Blueprint $table) {
            $table->bigIncrements('idEquipo');
            $table->string('nombre', 100)->nullable();
            $table->string('marca', 100)->nullable();
            $table->string('modelo', 100)->nullable();
            $table->string('numeroSerie', 255)->nullable();
            $table->string('descripcion', 255)->nullable();
            $table->date('fechaAlta')->nullable();
            $table->date('fechaBaja')->nullable();

            $table->unsignedBigInteger('idEstadoEquipo');
            $table->unsignedBigInteger('idPuesto');
            $table->unsignedBigInteger('idTipoEquipo');
            
            $table->foreign('idEstadoEquipo')->references('idEstadoEquipo')->on('estado_equipos');
            $table->foreign('idPuesto')->references('idPuesto')->on('puestos');
            $table->foreign('idTipoEquipo')->references('idTipoEquipo')->on('tipo_equipos');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipos');
    }
};
