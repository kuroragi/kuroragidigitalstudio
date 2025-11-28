<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Display a listing of services
     */
    public function index()
    {
        $services = Service::orderBy('order')->get();
        return response()->json([
            'data' => $services
        ]);
    }

    /**
     * Store a newly created service
     */
    public function store(Request $request)
    {
        // TODO: Implement service creation
        return response()->json([
            'message' => 'Service creation will be implemented in phase 4'
        ], 501);
    }

    /**
     * Display the specified service
     */
    public function show(Service $service)
    {
        return response()->json([
            'data' => $service
        ]);
    }

    /**
     * Update the specified service
     */
    public function update(Request $request, Service $service)
    {
        // TODO: Implement service update
        return response()->json([
            'message' => 'Service update will be implemented in phase 4'
        ], 501);
    }

    /**
     * Remove the specified service
     */
    public function destroy(Service $service)
    {
        // TODO: Implement service deletion
        return response()->json([
            'message' => 'Service deletion will be implemented in phase 4'
        ], 501);
    }
}