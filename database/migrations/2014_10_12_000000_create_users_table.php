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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('FirstName', 200);
            $table->string('LastName', 200);
            $table->text('Title')->nullable();
            $table->text('Avatar')->nullable();
            $table->string('email')->unique();
            $table->string('Phone')->nullable();
            $table->timestamp('EmailVerifiedAt')->nullable();
            $table->string('password');
            $table->boolean('IsSupperadm')->default(false);
            $table->boolean('IsPermitter')->default(false);
            $table->boolean('IsNego')->default(false);
            $table->boolean('IsFinal')->default(false);
            $table->boolean('IsActive')->default(true);
            $table->boolean('IsDeleted')->default(false);
            $table->string('IntegrationKey')->default("1");
            $table->string('Division')->nullable();
            $table->string('Department')->nullable();
            $table->string('Team')->nullable();
            $table->string('Section')->nullable();
            $table->string('Branch')->nullable();
            $table->string('Location')->nullable();
            $table->string('EmployeeCode')->nullable();
            $table->integer('ObjType')->default(10);
            $table->string('FullName')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
