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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // Web Development, Mobile App, Branding, etc.
            $table->string('thumbnail'); // Main project image
            $table->json('gallery')->nullable(); // Additional images array
            $table->text('description');
            $table->string('client')->nullable();
            $table->year('year');
            $table->enum('status', ['completed', 'ongoing', 'draft'])->default('completed');
            $table->string('project_url')->nullable(); // Live project URL
            $table->string('github_url')->nullable(); // GitHub repository
            $table->json('technologies')->nullable(); // Tech stack used
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index('category');
            $table->index('status');
            $table->index('year');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
