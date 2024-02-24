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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->date('PostingDate')->nullable();
            $table->string('ContractNo', 255)->nullable();
            $table->date('ContractDate')->nullable();
            $table->string('PicName', 255)->nullable();
            $table->string('picTitle', 255)->nullable();
            $table->string('BPPICName', 255)->nullable();
            $table->string('BPPICTitle', 255)->nullable();
            $table->integer('Period')->nullable();
            $table->string('AddressVn', 255)->nullable();
            $table->string('AddressEn', 255)->nullable();
            $table->string('BPAddressVn', 255)->nullable();
            $table->string('BPAddressEn', 255)->nullable();
            $table->string('BPPhone', 255)->nullable();
            $table->string('BPFax', 255)->nullable();
            $table->string('BPTaxcode', 255)->nullable();
            $table->decimal('Amount')->nullable();
            $table->integer('PaymentTerm')->nullable();
            $table->integer('PrePay')->nullable();
            $table->string('CardName', 255)->nullable();
            $table->string('ContractTerm', 255)->nullable();
            $table->date('FromDate')->nullable();
            $table->date('ToDate')->nullable();
            $table->string('UserCreated')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
