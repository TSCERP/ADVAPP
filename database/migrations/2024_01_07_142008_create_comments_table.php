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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->integer('ApprID');
            $table->text('context')->nullable();
            $table->string('file')->nullable();
            $table->integer('Parent_id')->unsigned()->nullable();
            $table->integer('BaseID');
            $table->integer('BaseType');
            $table->boolean('is_delete')->default(false);
            $table->integer('UserID');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
