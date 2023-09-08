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
        Schema::create('comentarios_incidente', function (Blueprint $table) {
            $table->bigIncrements('idComentario');
            $table->text('comentario');
            $table->dateTime('fechaHora');
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('idIncidente');
            $table->unsignedBigInteger('idTipoComentario');
            $table->foreign('idUsuario')->references('idUsuario')->on('usuarios');
            $table->foreign('idIncidente')->references('idIncidente')->on('incidentes');
            $table->foreign('idTipoComentario')->references('idTipoComentario')->on('tipo_comentarios');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentarios');
    }
};
