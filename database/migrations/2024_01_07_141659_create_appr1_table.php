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
        // this is table for approval descriptions
        Schema::create('APPR1', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ApprID');
            $table->foreign('ApprID')->references('id')->on('Approvals');
            $table->timestamp('StartDate')->nullable();
            $table->timestamp('EndDate')->nullable();
            $table->text('Location')->nullable();
            $table->text('Content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('APPR1');
    }
};
