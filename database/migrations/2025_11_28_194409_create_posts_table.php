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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt'); // Short description for listing
            $table->longText('content'); // Full blog content (Markdown or HTML)
            $table->string('cover_image')->nullable(); // Featured image
            $table->json('tags')->nullable(); // Post tags array
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->integer('read_time')->nullable(); // Estimated read time in minutes
            $table->unsignedBigInteger('views')->default(0);
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index('status');
            $table->index('published_at');
            $table->index(['status', 'published_at']);
            $table->fullText(['title', 'excerpt', 'content']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
