<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('localidades', function (Blueprint $table) {
            $table->id('idLocalidad');
            $table->unsignedBigInteger('idProvincia')->nullable();
            $table->string('Descripcion')->nullable();
            $table->integer('codigoPostal');
            $table->unsignedBigInteger('idPartido')->nullable();
            $table->boolean('esPartido')->default(false);
            $table->timestamps();

            // Clave foránea
            $table->foreign('idProvincia')->references('idProvincia')->on('provincias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('localidades');
    }
};
