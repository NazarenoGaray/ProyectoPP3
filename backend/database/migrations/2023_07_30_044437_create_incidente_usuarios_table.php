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
        Schema::create('incidente_usuarios', function (Blueprint $table) {
            $table->bigInteger('idIncidente')->unsigned();
            $table->bigInteger('idUsuario')->unsigned();
            $table->boolean('esObservador')->default(false);
            $table->timestamps();

            // Definir la clave primaria compuesta
            $table->primary(['idIncidente', 'idUsuario']);

            // Establecer la columna idUsuario como única
            $table->unique('idUsuario');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidente_usuarios');
    }
};
