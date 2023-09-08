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
        Schema::create('paises', function (Blueprint $table) {
            $table->id('idPais');
            $table->string('Descripcion')->nullable();
            $table->integer('Orden')->nullable();
            $table->boolean('Activo')->default(true);
            $table->string('BanderaPequena')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paises');
    }
};
