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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // Setting key
            $table->longText('value')->nullable(); // Setting value (JSON or string)
            $table->string('type')->default('string'); // string, boolean, json, number
            $table->text('description')->nullable(); // Setting description
            $table->string('group')->default('general'); // Settings group
            $table->boolean('is_public')->default(false); // Can be accessed by frontend
            $table->timestamps();
            
            // Indexes
            $table->index('key');
            $table->index('group');
            $table->index('is_public');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
