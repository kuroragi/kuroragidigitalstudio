<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Get admin dashboard stats
     */
    public function dashboard()
    {
        // TODO: Implement dashboard statistics
        // This will be implemented in later phases
        
        $stats = [
            'total_projects' => \App\Models\Project::count(),
            'total_services' => \App\Models\Service::count(), 
            'total_posts' => \App\Models\Post::count(),
            'total_contacts' => \App\Models\Contact::count(),
            'unread_contacts' => \App\Models\Contact::where('read_flag', false)->count(),
        ];

        return response()->json([
            'message' => 'Dashboard data retrieved successfully',
            'data' => $stats,
        ]);
    }
}