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
        Schema::create('opor', function (Blueprint $table) {
            $table->id();
            $table->integer('RefID');
            $table->integer('BaseID')->nullable();
            $table->integer('BaseType')->nullable();
            $table->string('CardCode');
            $table->string('CardName');
            $table->string('CusSite');
            $table->date('StartDate');
            $table->date('EndDate');
            $table->text('Summary')->nullable();
            $table->text('Note')->nullable();
            $table->decimal('VATAmt', 18, 2)->nullable();
            $table->decimal('Total', 18, 2)->nullable();
            $table->decimal('GrandTotal', 18, 2)->nullable();
            $table->integer('ObjType')->default(17);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opor');
    }
};
