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
        Schema::create('sectores', function (Blueprint $table) {
            $table->bigIncrements('idSector');
            $table->string('nombre', 255)->nullable();
            $table->string('ubicacion', 255)->nullable();
            $table->unsignedBigInteger('idEstablecimiento');

            $table->foreign('idEstablecimiento')->references('idEstablecimiento')->on('establecimientos');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sectores');
    }
};
