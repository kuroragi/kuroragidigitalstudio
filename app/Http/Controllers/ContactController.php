<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\User;
use App\Notifications\ContactFormSubmitted;
use App\Notifications\ContactFormConfirmation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    /**
     * Store a new contact submission
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'service' => 'nullable|string|in:web-development,ui-ux-design,mobile-development,cloud-devops,digital-branding,consulting,other',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:5000',
            'budget' => 'nullable|string|in:under-5k,5k-15k,15k-30k,30k-50k,over-50k,discuss',
            'timeline' => 'nullable|string|in:asap,1-month,1-3-months,3-6-months,6-months-plus,flexible'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Collect metadata
            $metadata = [
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referer' => $request->header('referer'),
                'submitted_at' => now()->toISOString(),
            ];

            // Create contact record
            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'organization' => $request->organization,
                'phone' => $request->phone,
                'service' => $request->service,
                'subject' => $request->subject,
                'message' => $request->message,
                'budget' => $request->budget,
                'timeline' => $request->timeline,
                'status' => 'new',
                'metadata' => $metadata
            ]);

            // Send email notifications
            $this->sendEmailNotifications($contact);

            // Log the submission
            Log::info('New contact form submission', [
                'contact_id' => $contact->id,
                'name' => $contact->name,
                'email' => $contact->email,
                'service' => $contact->service
            ]);

            return response()->json([
                'message' => 'Thank you for your message! We will get back to you within 24 hours.',
                'contact_id' => $contact->id
            ], 201);

        } catch (\Exception $e) {
            Log::error('Contact form submission failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->except(['_token'])
            ]);

            return response()->json([
                'message' => 'Sorry, there was an error processing your request. Please try again later.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Send email notifications for new contact using modern notification system
     */
    private function sendEmailNotifications(Contact $contact): void
    {
        try {
            // Send notification to all admin users
            $adminUsers = User::where('role', 'admin')->get();
            
            if ($adminUsers->isNotEmpty()) {
                Notification::send($adminUsers, new ContactFormSubmitted($contact));
                
                Log::info('Contact form admin notifications queued', [
                    'contact_id' => $contact->id,
                    'admin_count' => $adminUsers->count()
                ]);
            }

            // Send confirmation to user using notification route
            Notification::route('mail', $contact->email)
                ->notify(new ContactFormConfirmation($contact));
            
            Log::info('Contact form confirmation notification queued', [
                'contact_id' => $contact->id,
                'user_email' => $contact->email
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to queue contact form notifications', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Fallback to direct mail sending
            $this->sendEmailNotificationsFallback($contact);
        }
    }

    /**
     * Fallback email sending method using direct Mail facade
     */
    private function sendEmailNotificationsFallback(Contact $contact): void
    {
        try {
            // Send notification to admin (fallback)
            Mail::send('emails.contact.admin-notification', ['contact' => $contact], function ($message) {
                $message->to(config('mail.admin_email', 'admin@kuroragidigital.studio'))
                        ->subject('New Contact Form Submission - ' . config('app.name'));
            });

            // Send confirmation to user (fallback)
            Mail::send('emails.contact.user-confirmation', ['contact' => $contact], function ($message) use ($contact) {
                $message->to($contact->email, $contact->name)
                        ->subject('Thank you for contacting ' . config('app.name'));
            });

            Log::info('Contact form fallback emails sent successfully', [
                'contact_id' => $contact->id
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send fallback contact form emails', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Get all contacts (for admin)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Contact::query();

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('service')) {
            $query->where('service', $request->service);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('organization', 'LIKE', "%{$search}%")
                  ->orWhere('subject', 'LIKE', "%{$search}%");
            });
        }

        // Order by latest
        $query->orderBy('created_at', 'desc');

        // Paginate results
        $contacts = $query->paginate($request->get('per_page', 15));

        return response()->json($contacts);
    }

    /**
     * Show specific contact (for admin)
     */
    public function show(Contact $contact): JsonResponse
    {
        // Mark as read when viewed
        if ($contact->status === 'new') {
            $contact->markAsRead();
        }

        return response()->json([
            'contact' => $contact,
            'formatted_date' => $contact->formatted_date
        ]);
    }

    /**
     * Update contact status (for admin)
     */
    public function updateStatus(Request $request, Contact $contact): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:new,read,replied,resolved'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $contact->update(['status' => $request->status]);

        if ($request->status === 'replied') {
            $contact->markAsReplied();
        }

        return response()->json([
            'message' => 'Contact status updated successfully',
            'contact' => $contact
        ]);
    }

    /**
     * Delete contact (for admin)
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json([
            'message' => 'Contact deleted successfully'
        ]);
    }
}
