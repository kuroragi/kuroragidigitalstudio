<?php

namespace App\Console\Commands;

use App\Models\Contact;
use App\Models\User;
use App\Notifications\ContactFormSubmitted;
use App\Notifications\ContactFormConfirmation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class TestEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:test {type=both : Type of email to test (admin, user, both)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email notifications for contact form submissions';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $type = $this->argument('type');
        
        // Create a test contact
        $testContact = new Contact([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'organization' => 'Test Company',
            'phone' => '+1234567890',
            'service_interested' => 'web-development',
            'subject' => 'Test Contact Form Submission',
            'message' => 'This is a test message to verify email notifications are working correctly. Please ignore this test submission.',
            'budget' => '$5000-10000',
            'timeline' => '1-3 months',
            'status' => 'new'
        ]);
        
        // Assign a temporary ID for testing
        $testContact->id = 999999;
        $testContact->created_at = now();

        if (in_array($type, ['admin', 'both'])) {
            $this->testAdminNotification($testContact);
        }

        if (in_array($type, ['user', 'both'])) {
            $this->testUserNotification($testContact);
        }

        $this->info('Email test completed successfully!');
        $this->info('Check your logs for delivery status.');
    }

    private function testAdminNotification(Contact $contact)
    {
        $this->info('Sending test admin notification...');
        
        $adminUsers = User::where('role', 'admin')->get();
        
        if ($adminUsers->isEmpty()) {
            $this->warn('No admin users found. Creating test admin notification without user.');
            
            // Use anonymous notifiable for testing
            $testAdmin = new class {
                public function routeNotificationForMail() {
                    return config('mail.admin_email', 'admin@kuroragidigital.studio');
                }
            };
            
            $testAdmin->notify(new ContactFormSubmitted($contact));
        } else {
            Notification::send($adminUsers, new ContactFormSubmitted($contact));
            $this->info("Sent admin notification to {$adminUsers->count()} admin(s)");
        }
    }

    private function testUserNotification(Contact $contact)
    {
        $this->info('Sending test user confirmation...');
        
        // Use Notification facade for anonymous notifiable
        Notification::route('mail', $contact->email)
            ->notify(new ContactFormConfirmation($contact));
            
        $this->info("Sent user confirmation to {$contact->email}");
    }
}
