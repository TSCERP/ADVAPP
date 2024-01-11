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
        Schema::create('Permitters', function (Blueprint $table) {
            $table->id();
            $table->string('ApprID')->nullable();
            $table->integer('userID')->nullable();
            $table->integer('Status')->nullable();
            $table->integer('oldUserID')->nullable();
            $table->integer('ObjType')->default(19);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Permitters');
    }
};
