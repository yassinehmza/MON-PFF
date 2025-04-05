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
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_stagiaire')->constrained('stagiaires')->onDelete('cascade');
            $table->foreignId('id_formateur')->nullable()->constrained('formateurs')->onDelete('set null');
            $table->foreignId('id_entreprise')->constrained('entreprises')->onDelete('cascade');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->text('description');
            $table->string('evaluation')->nullable();
            $table->string('encadrant_entreprise');
            $table->string('contact_encadrant');
            $table->string('status')->default('en_attente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stages');
    }
};