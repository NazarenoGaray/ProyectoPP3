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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->bigIncrements('idUsuario');
            $table->string('nombre', 60);
            $table->string('apellido', 60);
            $table->string('correo', 100);
            $table->string('telefono', 20)->nullable();
            $table->string('celular', 20)->nullable();
            $table->string('usuario', 50);
            $table->string('contrasena', 100);
            $table->string('direccion', 100);
            $table->unsignedBigInteger('idEstadoUsuario');
            $table->unsignedBigInteger('idRol');
            $table->unsignedBigInteger('idPais');
            $table->unsignedBigInteger('idProvincia');
            $table->unsignedBigInteger('idLocalidad');
            $table->foreign('idEstadoUsuario')->references('idEstadoUsuario')->on('estado_usuarios');
            $table->foreign('idRol')->references('idRol')->on('roles');
            $table->foreign('idPais')->references('idPais')->on('paises');
            $table->foreign('idProvincia')->references('idProvincia')->on('provincias');
            $table->foreign('idLocalidad')->references('idLocalidad')->on('localidades');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
