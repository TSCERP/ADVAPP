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
        Schema::create('vho1', function (Blueprint $table) {
            $table->id();
            $table->integer('RefID');
            $table->integer('LineNum');
            $table->string('CardCode')->nullable();
            $table->string('CardName')->nullable();
            $table->string('Site');
            $table->string('SubItem');
            $table->string('Descrpt')->nullable();
            $table->string('Descrpt2')->nullable();
            $table->integer('Term')->default(1);
            $table->string('Unit');
            $table->float('Quantity');
            $table->float('OpenQty');
            $table->decimal('UnitPrice', 18, 2);
            $table->string('Lcurrency')->nullable();
            $table->string('Currency')->default('VND');
            $table->float('Exchange')->default(1);
            $table->decimal('FPrice', 18, 2);
            $table->string('VATGroup');
            $table->float('VATRate')->default(0);
            $table->decimal('BeforeVAT', 18, 2);
            $table->decimal('FBeforeVAT', 18, 2);
            $table->decimal('VATAmt', 18, 2);
            $table->decimal('FVATAmt', 18, 2)->default(0);
            $table->decimal('AfterVAT', 18, 2);
            $table->decimal('FAfterVAT', 18, 2)->default(0);
            $table->decimal('BeforeVAT2', 18, 2)->nullable();
            $table->decimal('VATAmt2', 18, 2)->nullable();
            $table->decimal('AfterVAT2', 18, 2)->nullable();
            $table->float('Allocation')->nullable();
            $table->boolean('LineStatus')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vho1');
    }
};
