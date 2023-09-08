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
        Schema::create('incidente_equipos', function (Blueprint $table) {
            $table->bigInteger('idEquipo')->unsigned();
            $table->bigInteger('idIncidente')->unsigned();
            $table->timestamps();

            // Definir la clave primaria compuesta
            $table->primary(['idEquipo', 'idIncidente']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidente_equipos');
    }
};
