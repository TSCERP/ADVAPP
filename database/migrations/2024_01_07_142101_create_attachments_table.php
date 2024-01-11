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
        Schema::create('Attachments', function (Blueprint $table) {
            $table->id();
            $table->string('BaseKey')->nullable();
            $table->integer('ObjType')->nullable();
            $table->string('Filename')->nullable();
            $table->text('Path')->nullable();
            $table->string('Type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Attachments');
    }
};
