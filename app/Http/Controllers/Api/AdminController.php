<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Post;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Get comprehensive dashboard statistics
     */
    public function dashboard(Request $request): JsonResponse
    {
        try {
            // Get date range for analytics (default: last 30 days)
            $days = $request->get('days', 30);
            $startDate = Carbon::now()->subDays($days);
            
            // Basic counts
            $totalContacts = Contact::count();
            $totalProjects = Project::count();
            $totalPosts = Post::count();
            $totalServices = Service::count();
            
            // Contact statistics
            $contactStats = [
                'total' => $totalContacts,
                'unread' => Contact::where('status', 'new')->count(),
                'read' => Contact::where('status', 'read')->count(),
                'replied' => Contact::where('status', 'replied')->count(),
                'resolved' => Contact::where('status', 'resolved')->count(),
                'recent' => Contact::where('created_at', '>=', $startDate)->count(),
                'today' => Contact::whereDate('created_at', today())->count(),
            ];

            // Project statistics
            $projectStats = [
                'total' => $totalProjects,
                'published' => Project::where('status', 'published')->count(),
                'draft' => Project::where('status', 'draft')->count(),
                'featured' => Project::where('is_featured', true)->count(),
                'recent' => Project::where('created_at', '>=', $startDate)->count(),
            ];

            // Blog post statistics
            $postStats = [
                'total' => $totalPosts,
                'published' => Post::where('status', 'published')->count(),
                'draft' => Post::where('status', 'draft')->count(),
                'featured' => Post::where('is_featured', true)->count(),
                'recent' => Post::where('created_at', '>=', $startDate)->count(),
            ];

            // Service statistics
            $serviceStats = [
                'total' => $totalServices,
                'active' => Service::where('is_active', true)->count(),
                'inactive' => Service::where('is_active', false)->count(),
                'featured' => Service::where('is_featured', true)->count(),
            ];

            // Recent activity (last 10 activities)
            $recentContacts = Contact::latest()
                ->take(5)
                ->select('id', 'name', 'email', 'subject', 'status', 'created_at')
                ->get();

            $recentProjects = Project::latest()
                ->take(3)
                ->select('id', 'title', 'status', 'created_at', 'updated_at')
                ->get();

            $recentPosts = Post::latest()
                ->take(3)
                ->select('id', 'title', 'status', 'created_at', 'updated_at')
                ->get();

            // Contact trends (last 7 days)
            $contactTrends = Contact::select(
                    DB::raw('DATE(created_at) as date'),
                    DB::raw('COUNT(*) as count')
                )
                ->where('created_at', '>=', Carbon::now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            // Popular services (based on contact inquiries)
            $popularServices = Contact::select('service', DB::raw('COUNT(*) as count'))
                ->whereNotNull('service')
                ->groupBy('service')
                ->orderBy('count', 'desc')
                ->take(5)
                ->get();

            // System information
            $systemInfo = [
                'total_users' => User::count(),
                'admin_users' => User::where('role', 'admin')->count(),
                'storage_used' => $this->getStorageUsage(),
                'last_backup' => null, // TODO: Implement backup tracking
                'uptime' => $this->getSystemUptime(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Dashboard statistics retrieved successfully',
                'data' => [
                    'overview' => [
                        'contacts' => $contactStats,
                        'projects' => $projectStats,
                        'posts' => $postStats,
                        'services' => $serviceStats,
                    ],
                    'recent_activity' => [
                        'contacts' => $recentContacts,
                        'projects' => $recentProjects,
                        'posts' => $recentPosts,
                    ],
                    'analytics' => [
                        'contact_trends' => $contactTrends,
                        'popular_services' => $popularServices,
                        'period_days' => $days,
                    ],
                    'system' => $systemInfo,
                    'generated_at' => now()->toISOString(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard statistics',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get storage usage information
     */
    private function getStorageUsage(): array
    {
        try {
            $storagePath = storage_path();
            $publicPath = public_path();
            
            return [
                'storage_size' => $this->formatBytes($this->getDirSize($storagePath)),
                'public_size' => $this->formatBytes($this->getDirSize($publicPath)),
                'total_size' => $this->formatBytes(
                    $this->getDirSize($storagePath) + $this->getDirSize($publicPath)
                ),
            ];
        } catch (\Exception $e) {
            return [
                'storage_size' => 'N/A',
                'public_size' => 'N/A',
                'total_size' => 'N/A',
            ];
        }
    }

    /**
     * Get directory size
     */
    private function getDirSize(string $directory): int
    {
        $size = 0;
        if (is_dir($directory)) {
            foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($directory)) as $file) {
                if ($file->isFile()) {
                    $size += $file->getSize();
                }
            }
        }
        return $size;
    }

    /**
     * Format bytes to human readable
     */
    private function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }

    /**
     * Get system uptime
     */
    private function getSystemUptime(): string
    {
        try {
            // This is a simple approximation - in production you might want to track this properly
            $uptime = time() - filemtime(base_path());
            $days = floor($uptime / 86400);
            $hours = floor(($uptime % 86400) / 3600);
            $minutes = floor(($uptime % 3600) / 60);
            
            return "{$days}d {$hours}h {$minutes}m";
        } catch (\Exception $e) {
            return 'N/A';
        }
    }

    /**
     * Get quick stats for mobile/summary view
     */
    public function quickStats(): JsonResponse
    {
        try {
            $stats = [
                'contacts_today' => Contact::whereDate('created_at', today())->count(),
                'unread_contacts' => Contact::where('status', 'new')->count(),
                'total_projects' => Project::count(),
                'published_posts' => Post::where('status', 'published')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve quick statistics'
            ], 500);
        }
    }

    /**
     * Get recent admin notifications
     */
    public function notifications(Request $request): JsonResponse
    {
        try {
            $limit = $request->get('limit', 10);
            
            // Get notifications for current admin user
            $notifications = $request->user()
                ->notifications()
                ->latest()
                ->limit($limit)
                ->get()
                ->map(function ($notification) {
                    return [
                        'id' => $notification->id,
                        'type' => class_basename($notification->type),
                        'data' => $notification->data,
                        'read_at' => $notification->read_at,
                        'created_at' => $notification->created_at,
                        'time_ago' => $notification->created_at->diffForHumans(),
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $notifications,
                'unread_count' => $request->user()->unreadNotifications()->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notifications'
            ], 500);
        }
    }

    /**
     * Mark notification as read
     */
    public function markNotificationAsRead(Request $request, $notificationId): JsonResponse
    {
        try {
            $notification = $request->user()
                ->notifications()
                ->where('id', $notificationId)
                ->first();

            if (!$notification) {
                return response()->json([
                    'success' => false,
                    'message' => 'Notification not found'
                ], 404);
            }

            $notification->markAsRead();

            return response()->json([
                'success' => true,
                'message' => 'Notification marked as read'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark notification as read'
            ], 500);
        }
    }

    /**
     * Mark all notifications as read
     */
    public function markAllNotificationsAsRead(Request $request): JsonResponse
    {
        try {
            $count = $request->user()->unreadNotifications()->update(['read_at' => now()]);

            return response()->json([
                'success' => true,
                'message' => "Marked {$count} notifications as read"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark notifications as read'
            ], 500);
        }
    }
}