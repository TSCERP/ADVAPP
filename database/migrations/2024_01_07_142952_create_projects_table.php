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
        Schema::create('Projects', function (Blueprint $table) {
            $table->id();
            $table->string('Code')->unique();
            $table->string('Name');
            $table->integer('ObjType')->default(21);
            $table->boolean('Active')->default(true);
            $table->boolean('IsDeleted')->default(false);
            $table->string('CreatedBy')->nullable();
            $table->string('UpdatedBy')->nullable();
            $table->timestamp('DeletedAt')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Projects');
    }
};
