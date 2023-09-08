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
        Schema::create('provincias', function (Blueprint $table) {
            $table->id('idProvincia');
            $table->unsignedBigInteger('idPais')->default(1);
            $table->string('Descripcion')->nullable();
            $table->integer('Orden')->nullable();
            $table->timestamps();

            // Clave foránea
            $table->foreign('idPais')->references('idPais')->on('paises');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provincias');
    }
};
