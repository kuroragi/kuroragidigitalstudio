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
        Schema::table('contacts', function (Blueprint $table) {
            // Add new fields
            $table->string('phone')->nullable()->after('email');
            $table->string('service')->nullable()->after('phone');
            $table->string('subject')->nullable()->after('service');
            $table->string('budget')->nullable()->after('message');
            $table->string('timeline')->nullable()->after('budget');
            $table->json('metadata')->nullable()->after('timeline');
            $table->timestamp('read_at')->nullable()->after('metadata');
            $table->timestamp('replied_at')->nullable()->after('read_at');
            
            // Update existing fields
            $table->dropColumn(['read_flag', 'priority', 'admin_notes', 'responded_at', 'attachment']);
            
            // Update status enum values
            $table->dropColumn('status');
        });
        
        // Re-add status column with new values
        Schema::table('contacts', function (Blueprint $table) {
            $table->enum('status', ['new', 'read', 'replied', 'resolved'])->default('new')->after('timeline');
            
            // Add new indexes
            $table->index('service');
            $table->index('budget');
            $table->index('timeline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            // Remove new fields
            $table->dropColumn([
                'phone', 
                'service', 
                'subject', 
                'budget', 
                'timeline', 
                'metadata', 
                'read_at', 
                'replied_at'
            ]);
            
            // Drop new indexes
            $table->dropIndex(['service']);
            $table->dropIndex(['budget']);
            $table->dropIndex(['timeline']);
            
            // Re-add old fields
            $table->string('attachment')->nullable();
            $table->boolean('read_flag')->default(false);
            $table->enum('priority', ['low', 'normal', 'high'])->default('normal');
            $table->text('admin_notes')->nullable();
            $table->timestamp('responded_at')->nullable();
            
            // Update status back to old values
            $table->dropColumn('status');
        });
        
        // Re-add old status column
        Schema::table('contacts', function (Blueprint $table) {
            $table->enum('status', ['new', 'in_progress', 'responded', 'closed'])->default('new');
            
            // Re-add old indexes
            $table->index('read_flag');
            $table->index(['read_flag', 'status']);
        });
    }
};
