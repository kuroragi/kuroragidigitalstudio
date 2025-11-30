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
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'nullable|string',
                'image_url' => 'nullable|url',
                'project_url' => 'nullable|url',
                'github_url' => 'nullable|url',
                'technologies' => 'nullable|array',
                'category' => 'required|in:web,mobile,design,other',
                'status' => 'required|in:draft,published',
                'is_featured' => 'boolean',
            ]);

            $project = Project::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Project created successfully',
                'data' => $project
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create project: ' . $e->getMessage()
            ], 500);
        }
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
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'nullable|string',
                'image_url' => 'nullable|url',
                'project_url' => 'nullable|url',
                'github_url' => 'nullable|url',
                'technologies' => 'nullable|array',
                'category' => 'required|in:web,mobile,design,other',
                'status' => 'required|in:draft,published',
                'is_featured' => 'boolean',
            ]);

            $project->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully',
                'data' => $project->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update project: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified project
     */
    public function destroy(Project $project)
    {
        try {
            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete project: ' . $e->getMessage()
            ], 500);
        }
    }
}