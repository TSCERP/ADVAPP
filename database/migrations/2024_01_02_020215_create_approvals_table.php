
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
        Schema::create('approvals', function (Blueprint $table) {
            $table->id();
            $table->string('DocNum', 254)->unique();
            $table->string('DocType', 50);
            $table->boolean('NewTrading')->nullable()->default(false);
            $table->string('CategoryCode', 254)->nullable();
            $table->string('CategoryName', 254)->nullable();
            $table->string('CategoryVI', 254)->nullable();
            $table->dateTime('DocDate')->default(now());
            $table->text('Subject', 254)->nullable();
            $table->float('WinRate', 254)->nullable();
            $table->string('PIC', 254)->nullable();
            $table->string('Division', 254)->nullable();
            $table->string('Department', 254)->nullable();
            $table->string('Section', 254)->nullable();
            $table->string('DocStatus', 254)->nullable();
            $table->boolean('Revised ')->nullable()->default(false);
            $table->string('RevisedBy', 254)->nullable();
            $table->datetime('RevisedDate')->nullable();
            $table->boolean('Cancelled')->nullable()->default(false);
            $table->string('CancelledBy', 254)->nullable();
            $table->string('CancelledDate', 254)->nullable();
            $table->boolean('deleted')->nullable()->default(false);
            $table->string('deletedBy', 254)->nullable();
            $table->string('deletedDate', 254)->nullable();
            $table->string('UpdateBy', 254)->nullable();
            $table->string('UpdateDate', 254)->nullable();
            $table->boolean('is_close')->nullable()->default(false);
            $table->string('BaseRef', 254)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approvals');
    }
};
