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
        Schema::create('puestos', function (Blueprint $table) {
            $table->bigIncrements('idPuesto');
            $table->string('puestoRed', 255)->nullable();
            $table->string('telefono', 25)->nullable();
            $table->string('descripcion', 255)->nullable();
            $table->unsignedBigInteger('idSector');

            $table->foreign('idSector')->references('idSector')->on('sectores');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puestos');
    }
};
