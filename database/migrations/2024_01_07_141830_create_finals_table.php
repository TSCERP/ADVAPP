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
        Schema::create('Finals', function (Blueprint $table) {
            $table->id();
            $table->string('ApprID')->nullable();
            $table->integer('UserID')->nullable();
            $table->integer('Status')->nullable();
            $table->integer('OldUserID')->nullable();
            $table->integer('ObjType')->default(20);
            $table->string('Decision')->nullable();
            $table->text('Note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Finals');
    }
};
