<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
// use Illuminate\Support\Facades\Mail;
// use App\Mail\ContactFormSubmitted;

class ContactController extends Controller
{
    /**
     * Display a listing of contacts (admin only)
     */
    public function index()
    {
        $contacts = Contact::latest()->paginate(20);
        return response()->json($contacts);
    }

    /**
     * Store a newly created contact form submission
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            'attachment' => 'nullable|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png'
        ]);

        // TODO: Handle file upload in phase 4
        $contact = Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'organization' => $validated['organization'] ?? null,
            'message' => $validated['message'],
            'read_flag' => false
        ]);

        // TODO: Send email notification in phase 6
        // Mail::to(config('mail.admin_email'))->send(new ContactFormSubmitted($contact));

        return response()->json([
            'message' => 'Thank you for your message. We will get back to you soon!',
            'data' => $contact
        ], 201);
    }

    /**
     * Display the specified contact
     */
    public function show(Contact $contact)
    {
        return response()->json([
            'data' => $contact
        ]);
    }

    /**
     * Mark contact as read
     */
    public function markAsRead(Contact $contact)
    {
        $contact->update(['read_flag' => true]);
        
        return response()->json([
            'message' => 'Contact marked as read',
            'data' => $contact
        ]);
    }

    /**
     * Remove the specified contact
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        
        return response()->json([
            'message' => 'Contact deleted successfully'
        ]);
    }
}