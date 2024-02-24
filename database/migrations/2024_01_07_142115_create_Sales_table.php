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
        Schema::create('SALES', function (Blueprint $table) {
            $table->id();
            $table->integer('ApprID');
            $table->date('StartDate');
            $table->date('EndDate');
            $table->text('Summary')->nullable();
            $table->text('Note')->nullable();
            $table->decimal('VATAmt', 18, 2)->nullable();
            $table->decimal('Total', 18, 2)->nullable();
            $table->decimal('GrandTotal', 18, 2)->nullable();
            $table->integer('ObjType')->default(12);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('SALES');
    }
};
