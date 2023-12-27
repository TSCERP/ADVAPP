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
        Schema::create('NSIntegration', function (Blueprint $table) {
            $table->id();
            $table->string('NETSUITE_ENDPOINT', 254);
            $table->string('NETSUITE_HOST', 254);
            $table->string('NETSUITE_ACCOUNT', 254);
            $table->string('NETSUITE_CONSUMER_KEY', 254);
            $table->string('NETSUITE_CONSUMER_SECRET', 254);
            $table->string('NETSUITE_TOKEN_KEY', 254);
            $table->string('NETSUITE_TOKEN_SECRET', 254);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('NSIntegration');
    }
};
