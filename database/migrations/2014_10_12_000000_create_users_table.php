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
            $table->string('Email')->unique();
            $table->string('Phone')->nullable();
            $table->timestamp('Email_verified_at')->nullable();
            $table->string('Password');
            $table->boolean('is_supperadm')->default(false);
            $table->boolean('is_permitter')->default(false);
            $table->boolean('is_nego')->default(false);
            $table->boolean('is_final')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_deleted')->default(false);
            $table->string('IntegrationKey')->default("1");
            $table->string('Division')->nullable();
            $table->string('Department')->nullable();
            $table->string('Team')->nullable();
            $table->string('Section')->nullable();
            $table->string('Branch')->nullable();
            $table->string('Location')->nullable();
            $table->string('EmployeeCode')->nullable();
            $table->integer('ObjType')->default(10);
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
