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
        Schema::create('establecimientos', function (Blueprint $table) {
            $table->bigIncrements('idEstablecimiento');
            $table->string('nombre', 100);
            $table->string('calle', 60);
            $table->string('altura', 10);
            $table->string('telefono', 25)->nullable();
            $table->string('correo', 60)->nullable();
            $table->string('cuit', 20)->nullable();
            $table->text('descripcion')->nullable();
            $table->string('sitioweb', 255)->nullable();
            $table->unsignedBigInteger('idPais');
            $table->unsignedBigInteger('idProvincia');
            $table->unsignedBigInteger('idLocalidad');

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
        Schema::dropIfExists('establecimientos');
    }
};
