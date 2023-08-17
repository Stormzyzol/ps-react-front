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
        Schema::create('jogadores', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('imagem');
            $table->string('time');
            $table->integer('idade');
            $table->unsignedBigInteger('nacionalidade_id');
            $table->timestamps();

            $table->foreign('nacionalidade_id')->references('id')->on('nacionalidades')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jogadors');
    }
};
