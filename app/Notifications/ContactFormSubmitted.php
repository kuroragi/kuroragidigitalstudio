<?php

namespace App\Notifications;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactFormSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The contact form submission
     */
    public function __construct(
        public Contact $contact
    ) {
        // Set queue delay for immediate processing
        $this->delay(now());
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $urgencyLevel = $this->getUrgencyLevel();
        
        return (new MailMessage)
            ->subject("🔔 New Contact Form Submission - {$this->contact->name}")
            ->view('emails.contact.admin-notification', [
                'contact' => $this->contact,
                'urgencyLevel' => $urgencyLevel,
                'adminUrl' => config('app.url') . '/portal/contacts'
            ])
            ->priority($urgencyLevel === 'high' ? 1 : 3);
    }

    /**
     * Get the database representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'contact_id' => $this->contact->id,
            'contact_name' => $this->contact->name,
            'contact_email' => $this->contact->email,
            'service_interested' => $this->contact->service_interested,
            'urgency_level' => $this->getUrgencyLevel(),
            'message_preview' => substr($this->contact->message, 0, 100) . '...',
            'submitted_at' => $this->contact->created_at,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }

    /**
     * Determine urgency level based on message content and service
     */
    private function getUrgencyLevel(): string
    {
        $urgentKeywords = ['urgent', 'asap', 'emergency', 'immediate', 'rush', 'critical'];
        $messageContent = strtolower($this->contact->message);
        
        // Check for urgent keywords
        foreach ($urgentKeywords as $keyword) {
            if (str_contains($messageContent, $keyword)) {
                return 'high';
            }
        }

        // High-value services get medium priority
        $highValueServices = ['custom-development', 'enterprise-solutions'];
        if (in_array($this->contact->service_interested, $highValueServices)) {
            return 'medium';
        }

        return 'normal';
    }
}