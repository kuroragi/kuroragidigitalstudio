<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if doesn't exist
        $adminUser = User::where('email', 'admin@kuroragidigital.studio')->first();

        if (!$adminUser) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@kuroragidigital.studio',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]);

            $this->command->info('Admin user created successfully!');
            $this->command->info('Email: admin@kuroragidigital.studio');
            $this->command->info('Password: admin123');
        } else {
            // Update existing user to admin role if needed
            if ($adminUser->role !== 'admin') {
                $adminUser->update(['role' => 'admin']);
                $this->command->info('Updated existing user to admin role.');
            } else {
                $this->command->info('Admin user already exists.');
            }
        }

        // Create additional test admin if in development
        if (app()->environment('local')) {
            $devAdmin = User::where('email', 'dev@kuroragidigital.studio')->first();
            
            if (!$devAdmin) {
                User::create([
                    'name' => 'Developer',
                    'email' => 'dev@kuroragidigital.studio',
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                    'role' => 'admin',
                ]);

                $this->command->info('Development admin user created!');
                $this->command->info('Email: dev@kuroragidigital.studio');
                $this->command->info('Password: password');
            }
        }
    }
}
