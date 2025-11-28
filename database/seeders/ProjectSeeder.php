<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        
        $projects = [
            [
                'title' => 'E-Commerce Platform Modernization',
                'slug' => 'e-commerce-platform-modernization',
                'category' => 'Web Development',
                'thumbnail' => 'projects/ecommerce-thumb.jpg',
                'gallery' => [
                    'projects/ecommerce-1.jpg',
                    'projects/ecommerce-2.jpg', 
                    'projects/ecommerce-3.jpg'
                ],
                'description' => 'Complete overhaul of legacy e-commerce platform dengan implementasi modern architecture, microservices, dan real-time analytics. Meningkatkan conversion rate hingga 145% dan loading speed 3x lebih cepat.',
                'client' => 'TechnoMart Indonesia',
                'year' => 2024,
                'status' => 'completed',
                'project_url' => 'https://technomart.co.id',
                'technologies' => ['Laravel', 'Vue.js', 'Redis', 'MySQL', 'Docker', 'AWS'],
                'created_by' => $admin->id
            ],
            [
                'title' => 'Smart City Dashboard',
                'slug' => 'smart-city-dashboard',
                'category' => 'Web Application',
                'thumbnail' => 'projects/smart-city-thumb.jpg',
                'gallery' => [
                    'projects/smart-city-1.jpg',
                    'projects/smart-city-2.jpg'
                ],
                'description' => 'Comprehensive dashboard untuk monitoring real-time city infrastructure including traffic, waste management, energy consumption, dan public services. Melayani 500k+ residents dengan 99.9% uptime.',
                'client' => 'Pemkot Bandung',
                'year' => 2024,
                'status' => 'completed', 
                'project_url' => 'https://smartcity.bandung.go.id',
                'technologies' => ['React', 'Node.js', 'PostgreSQL', 'D3.js', 'WebSocket', 'Kubernetes'],
                'created_by' => $admin->id
            ],
            [
                'title' => 'FinTech Mobile Banking App',
                'slug' => 'fintech-mobile-banking',
                'category' => 'Mobile App',
                'thumbnail' => 'projects/fintech-thumb.jpg',
                'gallery' => [
                    'projects/fintech-1.jpg',
                    'projects/fintech-2.jpg',
                    'projects/fintech-3.jpg',
                    'projects/fintech-4.jpg'
                ],
                'description' => 'Revolutionary mobile banking app dengan biometric authentication, AI-powered financial insights, dan seamless P2P payments. Downloaded 1M+ kali dengan 4.8 rating di Play Store.',
                'client' => 'NeoBank Digital',
                'year' => 2024,
                'status' => 'completed',
                'project_url' => 'https://neobank.app',
                'technologies' => ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'TensorFlow', 'Stripe'],
                'created_by' => $admin->id
            ],
            [
                'title' => 'Healthcare Management System',
                'slug' => 'healthcare-management-system',
                'category' => 'Enterprise Software',
                'thumbnail' => 'projects/healthcare-thumb.jpg',
                'gallery' => [
                    'projects/healthcare-1.jpg',
                    'projects/healthcare-2.jpg'
                ],
                'description' => 'Integrated hospital management system dengan electronic medical records, appointment scheduling, inventory management, dan telemedicine capabilities. Melayani 15+ rumah sakit di Jawa Barat.',
                'client' => 'RS Hermina Group',
                'year' => 2023,
                'status' => 'completed',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'WebRTC', 'Docker', 'Redis'],
                'created_by' => $admin->id
            ],
            [
                'title' => 'EdTech Learning Platform',
                'slug' => 'edtech-learning-platform',
                'category' => 'Web Application',
                'thumbnail' => 'projects/edtech-thumb.jpg',
                'gallery' => [
                    'projects/edtech-1.jpg',
                    'projects/edtech-2.jpg',
                    'projects/edtech-3.jpg'
                ],
                'description' => 'Comprehensive online learning platform dengan live streaming, interactive assignments, progress tracking, dan AI-based personalized learning paths. 50k+ active students nationwide.',
                'client' => 'EduNova Indonesia',
                'year' => 2023,
                'status' => 'ongoing',
                'project_url' => 'https://edunova.id',
                'technologies' => ['Next.js', 'Laravel', 'PostgreSQL', 'WebRTC', 'TensorFlow', 'AWS'],
                'created_by' => $admin->id
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
