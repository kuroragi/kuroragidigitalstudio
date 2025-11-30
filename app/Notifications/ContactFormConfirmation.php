<?php

namespace App\Notifications;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactFormConfirmation extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * The contact form submission
     */
    public function __construct(
        public Contact $contact
    ) {
        // Delay confirmation email by 30 seconds for better user experience
        $this->delay(now()->addSeconds(30));
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $estimatedResponse = $this->getEstimatedResponseTime();
        
        return (new MailMessage)
            ->subject("✅ We received your message - " . config('app.name'))
            ->view('emails.contact.user-confirmation', [
                'contact' => $this->contact,
                'estimatedResponse' => $estimatedResponse,
                'trackingId' => $this->generateTrackingId(),
                'companyInfo' => $this->getCompanyInfo()
            ])
            ->replyTo('no-reply@kuroragidigital.studio', config('app.name'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'contact_id' => $this->contact->id,
            'confirmation_sent_at' => now(),
            'estimated_response' => $this->getEstimatedResponseTime(),
        ];
    }

    /**
     * Generate tracking ID for the contact form submission
     */
    private function generateTrackingId(): string
    {
        return 'KDS-' . date('Y') . '-' . str_pad($this->contact->id, 6, '0', STR_PAD_LEFT);
    }

    /**
     * Get estimated response time based on service and urgency
     */
    private function getEstimatedResponseTime(): array
    {
        $urgentKeywords = ['urgent', 'asap', 'emergency', 'immediate', 'rush'];
        $messageContent = strtolower($this->contact->message);
        
        $isUrgent = false;
        foreach ($urgentKeywords as $keyword) {
            if (str_contains($messageContent, $keyword)) {
                $isUrgent = true;
                break;
            }
        }

        if ($isUrgent) {
            return [
                'time' => '2-4 hours',
                'note' => 'We noticed your message is marked as urgent and will prioritize our response.'
            ];
        }

        // Different response times based on service type
        return match($this->contact->service_interested) {
            'web-development', 'mobile-development' => [
                'time' => '24-48 hours',
                'note' => 'Development inquiries require detailed planning and will receive a comprehensive response.'
            ],
            'ui-ux-design' => [
                'time' => '12-24 hours', 
                'note' => 'Design consultations typically require portfolio review and initial concept discussion.'
            ],
            'consultation' => [
                'time' => '4-8 hours',
                'note' => 'Consultation requests are processed quickly to schedule your session.'
            ],
            default => [
                'time' => '12-24 hours',
                'note' => 'We aim to respond to all inquiries within one business day.'
            ]
        };
    }

    /**
     * Get company information for email footer
     */
    private function getCompanyInfo(): array
    {
        return [
            'name' => config('app.name'),
            'website' => config('app.url'),
            'email' => 'hello@kuroragidigital.studio',
            'phone' => '+62 xxx-xxx-xxxx', // Replace with actual phone
            'address' => 'Jakarta, Indonesia', // Replace with actual address
            'social' => [
                'linkedin' => 'https://linkedin.com/company/kuroragi-digital-studio',
                'github' => 'https://github.com/kuroragi',
                'twitter' => 'https://twitter.com/kuroragidigital'
            ]
        ];
    }
}