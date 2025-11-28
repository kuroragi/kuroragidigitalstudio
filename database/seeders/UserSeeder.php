<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Kuroragi Admin',
            'email' => 'admin@kuroragidigital.studio',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create additional test users if needed
        User::create([
            'name' => 'Test User',
            'email' => 'user@kuroragidigital.studio',
            'password' => Hash::make('user123'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}
