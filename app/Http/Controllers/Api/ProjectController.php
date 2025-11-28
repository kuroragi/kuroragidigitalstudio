<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects
     */
    public function index(Request $request)
    {
        // TODO: Implement with filtering, pagination, and search
        $projects = Project::query()
            ->when($request->category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where('title', 'LIKE', "%{$search}%")
                           ->orWhere('description', 'LIKE', "%{$search}%");
            })
            ->latest()
            ->paginate(12);

        return response()->json($projects);
    }

    /**
     * Store a newly created project
     */
    public function store(Request $request)
    {
        // TODO: Implement project creation with validation and file upload
        return response()->json([
            'message' => 'Project creation will be implemented in phase 4'
        ], 501);
    }

    /**
     * Display the specified project
     */
    public function show(Project $project)
    {
        return response()->json([
            'data' => $project
        ]);
    }

    /**
     * Update the specified project
     */
    public function update(Request $request, Project $project)
    {
        // TODO: Implement project update
        return response()->json([
            'message' => 'Project update will be implemented in phase 4'
        ], 501);
    }

    /**
     * Remove the specified project
     */
    public function destroy(Project $project)
    {
        // TODO: Implement project deletion
        return response()->json([
            'message' => 'Project deletion will be implemented in phase 4'
        ], 501);
    }
}