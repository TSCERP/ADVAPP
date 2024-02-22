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
            $table->date('posting_date')->nullable();
            $table->string('contract_no',255)->nullable();
            $table->date('contract_date')->nullable();
            $table->string('pic_name',255)->nullable();
            $table->string('pic_title',255)->nullable();
            $table->string('BPPIC_Name',255)->nullable();
            $table->string('BPPIC_title',255)->nullable();
            $table->integer('Period')->nullable();
            $table->string('address_vn',255)->nullable();
            $table->string('address_en',255)->nullable();
            $table->string('BP_address_vn',255)->nullable();
            $table->string('BP_address_en',255)->nullable();
            $table->string('BP_phone',255)->nullable();
            $table->string('BP_fax',255)->nullable();
            $table->string('BP_taxcode',255)->nullable();
            $table->decimal('amount')->nullable();
            $table->integer('payment_term')->nullable();
            $table->integer('prepay')->nullable();
            $table->string('CardName',255)->nullable();
            $table->string('contract_term',255)->nullable();
            $table->date('fromdate')->nullable();
            $table->date('todate')->nullable();
            $table->string('user_created')->nullable();
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
