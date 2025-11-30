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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('organization')->nullable();
            $table->string('phone')->nullable();
            $table->string('service')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->string('budget')->nullable();
            $table->string('timeline')->nullable();
            $table->string('status')->default('new'); // new, read, replied, resolved
            $table->json('metadata')->nullable(); // For additional data like IP, user agent, etc.
            $table->timestamp('read_at')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
            
            // Indexes for better query performance
            $table->index(['status', 'created_at']);
            $table->index(['email', 'created_at']);
            $table->index('service');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
