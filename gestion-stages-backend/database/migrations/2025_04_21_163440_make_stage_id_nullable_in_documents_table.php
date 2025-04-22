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
    Schema::table('documents', function (Blueprint $table) {
        $table->dropForeign(['stage_id']);
        $table->foreignId('stage_id')->nullable()->change();
        $table->foreign('stage_id')->references('id')->on('stages')->onDelete('cascade');
    });
}

public function down()
{
    Schema::table('documents', function (Blueprint $table) {
        $table->dropForeign(['stage_id']);
        $table->foreignId('stage_id')->constrained('stages')->onDelete('cascade')->change();
    });
}
};
