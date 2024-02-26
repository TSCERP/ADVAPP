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
        Schema::create('SALE2', function (Blueprint $table) {
            $table->id();
            $table->integer('RefID');
            $table->string('CardCode');
            $table->string('CardName');
            $table->string('Site');
            $table->string('SubItem');
            $table->string('Descrpt')->nullable();
            $table->string('Descrpt2')->nullable();
            $table->string('Unit');
            $table->decimal('UnitPrice', 18, 2);
            $table->string('LCurrency');
            $table->string('Currency')->default('VND');
            $table->float('Exchange');
            $table->decimal('FPrice', 18, 2);
            $table->string('LineNum');
            $table->boolean('LineStatus')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('SALE2');
    }
};
