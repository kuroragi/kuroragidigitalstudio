<?php

use Illuminate\Support\Facades\Route;

// SPA Catch-all route - React Router will handle frontend routing
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
