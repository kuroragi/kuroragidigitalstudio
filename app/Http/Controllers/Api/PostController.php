<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Display a listing of blog posts
     */
    public function index(Request $request)
    {
        $posts = Post::query()
            ->when($request->search, function ($query, $search) {
                return $query->where('title', 'LIKE', "%{$search}%")
                           ->orWhere('excerpt', 'LIKE', "%{$search}%");
            })
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->latest('published_at')
            ->paginate(9);

        return response()->json($posts);
    }

    /**
     * Store a newly created post
     */
    public function store(Request $request)
    {
        // TODO: Implement blog post creation
        return response()->json([
            'message' => 'Post creation will be implemented in phase 4'
        ], 501);
    }

    /**
     * Display the specified post
     */
    public function show($slug)
    {
        $post = Post::where('slug', $slug)
                   ->whereNotNull('published_at')
                   ->where('published_at', '<=', now())
                   ->firstOrFail();

        return response()->json([
            'data' => $post
        ]);
    }

    /**
     * Update the specified post
     */
    public function update(Request $request, Post $post)
    {
        // TODO: Implement post update
        return response()->json([
            'message' => 'Post update will be implemented in phase 4'
        ], 501);
    }

    /**
     * Remove the specified post
     */
    public function destroy(Post $post)
    {
        // TODO: Implement post deletion
        return response()->json([
            'message' => 'Post deletion will be implemented in phase 4'
        ], 501);
    }
}