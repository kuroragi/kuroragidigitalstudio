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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description'); // For cards preview
            $table->longText('content'); // Full service description
            $table->string('icon')->nullable(); // Icon class or SVG path
            $table->json('features')->nullable(); // Service features array
            $table->decimal('starting_price', 10, 2)->nullable();
            $table->integer('order')->default(0); // Display order
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            // Indexes
            $table->index('order');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
