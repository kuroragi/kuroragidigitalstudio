<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public API Routes
Route::prefix('v1')->group(function () {
    // Authentication routes
    Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout'])->middleware('auth:sanctum');
    
    // Public content routes
    Route::get('/projects', [\App\Http\Controllers\Api\ProjectController::class, 'index']);
    Route::get('/projects/{project}', [\App\Http\Controllers\Api\ProjectController::class, 'show']);
    Route::get('/services', [\App\Http\Controllers\Api\ServiceController::class, 'index']);
    Route::get('/services/{service}', [\App\Http\Controllers\Api\ServiceController::class, 'show']);
    Route::get('/posts', [\App\Http\Controllers\Api\PostController::class, 'index']);
    Route::get('/posts/{post}', [\App\Http\Controllers\Api\PostController::class, 'show']);
    
    // Contact form submission
    Route::post('/contacts', [\App\Http\Controllers\Api\ContactController::class, 'store']);
    
    // Protected admin routes
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [\App\Http\Controllers\Api\AdminController::class, 'dashboard']);
        
        // Projects management
        Route::apiResource('projects', \App\Http\Controllers\Api\ProjectController::class)->except(['index', 'show']);
        
        // Services management
        Route::apiResource('services', \App\Http\Controllers\Api\ServiceController::class)->except(['index', 'show']);
        
        // Posts management
        Route::apiResource('posts', \App\Http\Controllers\Api\PostController::class)->except(['index', 'show']);
        
        // Contacts management
        Route::get('/contacts', [\App\Http\Controllers\Api\ContactController::class, 'index']);
        Route::get('/contacts/{contact}', [\App\Http\Controllers\Api\ContactController::class, 'show']);
        Route::patch('/contacts/{contact}/mark-read', [\App\Http\Controllers\Api\ContactController::class, 'markAsRead']);
        Route::delete('/contacts/{contact}', [\App\Http\Controllers\Api\ContactController::class, 'destroy']);
    });
    
    // User info (for authenticated users)
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });
});