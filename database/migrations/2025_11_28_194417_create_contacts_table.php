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
            $table->text('message');
            $table->string('attachment')->nullable(); // File path if uploaded
            $table->boolean('read_flag')->default(false);
            $table->enum('priority', ['low', 'normal', 'high'])->default('normal');
            $table->enum('status', ['new', 'in_progress', 'responded', 'closed'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('read_flag');
            $table->index('status');
            $table->index(['read_flag', 'status']);
            $table->index('created_at');
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
