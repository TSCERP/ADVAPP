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
        Schema::create('APPR2', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ApprID');
            $table->foreign('ApprID')->references('id')->on('Approvals');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('APPR2');
    }
};
