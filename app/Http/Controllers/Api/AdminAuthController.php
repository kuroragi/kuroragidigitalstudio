<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /**
     * Admin login
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Find user by email
            $user = User::where('email', $request->email)->first();

            // Check if user exists and password is correct
            if (!$user || !Hash::check($request->password, $user->password)) {
                Log::warning('Failed admin login attempt', [
                    'email' => $request->email,
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent()
                ]);

                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }

            // Check if user has admin role
            if ($user->role !== 'admin') {
                Log::warning('Non-admin user attempted portal access', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'role' => $user->role,
                    'ip' => $request->ip()
                ]);

                return response()->json([
                    'message' => 'Unauthorized access'
                ], 403);
            }

            // Delete old tokens
            $user->tokens()->delete();

            // Create new token
            $token = $user->createToken('admin-portal', ['admin'])->plainTextToken;

            // Log successful login
            Log::info('Admin user logged in successfully', [
                'user_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'token' => $token
            ]);

        } catch (\Exception $e) {
            Log::error('Admin login error', [
                'error' => $e->getMessage(),
                'email' => $request->email,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'message' => 'An error occurred during login'
            ], 500);
        }
    }

    /**
     * Admin logout
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // Revoke current token
            $request->user()->currentAccessToken()->delete();

            Log::info('Admin user logged out', [
                'user_id' => $request->user()->id,
                'email' => $request->user()->email,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'message' => 'Logout successful'
            ]);

        } catch (\Exception $e) {
            Log::error('Admin logout error', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'message' => 'Logout successful'
            ]); // Always return success for logout
        }
    }

    /**
     * Get authenticated admin user
     */
    public function me(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            if (!$user || $user->role !== 'admin') {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Admin me endpoint error', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null
            ]);

            return response()->json([
                'message' => 'An error occurred'
            ], 500);
        }
    }

    /**
     * Refresh admin token
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            if (!$user || $user->role !== 'admin') {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Delete old tokens
            $user->tokens()->delete();

            // Create new token
            $token = $user->createToken('admin-portal', ['admin'])->plainTextToken;

            Log::info('Admin token refreshed', [
                'user_id' => $user->id,
                'email' => $user->email,
                'ip' => $request->ip()
            ]);

            return response()->json([
                'message' => 'Token refreshed successfully',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Admin token refresh error', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null
            ]);

            return response()->json([
                'message' => 'Token refresh failed'
            ], 500);
        }
    }
}
