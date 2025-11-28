<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'slug' => 'web-development',
                'short_description' => 'Solusi website modern dan responsif dengan teknologi terdepan untuk meningkatkan presence digital bisnis Anda.',
                'content' => 'Kami mengembangkan website yang tidak hanya terlihat menakjubkan, tetapi juga memberikan performa optimal dan user experience yang luar biasa. Menggunakan teknologi seperti Laravel, React, Vue.js, dan framework modern lainnya, kami memastikan website Anda siap menghadapi tantangan digital masa depan.',
                'icon' => 'code',
                'features' => [
                    'Responsive Design',
                    'SEO Optimized', 
                    'Fast Loading Speed',
                    'Mobile-First Approach',
                    'Modern Framework',
                    'Admin Dashboard'
                ],
                'starting_price' => 15000000,
                'order' => 1,
                'is_featured' => true
            ],
            [
                'title' => 'UI/UX Design',
                'slug' => 'ui-ux-design',
                'short_description' => 'Desain interface yang intuitif dan user experience yang memukau untuk meningkatkan engagement pengguna.',
                'content' => 'Tim desainer kami menciptakan interface yang tidak hanya indah dipandang, tetapi juga mudah digunakan. Melalui research mendalam dan testing, kami memastikan setiap elemen desain memberikan nilai maksimal bagi user journey dan business goals Anda.',
                'icon' => 'palette',
                'features' => [
                    'User Research & Analysis',
                    'Wireframing & Prototyping',
                    'Visual Design',
                    'Usability Testing',
                    'Design System',
                    'Interactive Prototype'
                ],
                'starting_price' => 8000000,
                'order' => 2,
                'is_featured' => true
            ],
            [
                'title' => 'Mobile App Development',
                'slug' => 'mobile-app-development', 
                'short_description' => 'Aplikasi mobile native dan cross-platform yang powerful untuk iOS dan Android.',
                'content' => 'Dari konsep hingga deployment di App Store dan Google Play, kami mengembangkan aplikasi mobile yang memberikan performa native dengan development efficiency yang optimal. Menggunakan React Native, Flutter, atau native development sesuai kebutuhan project.',
                'icon' => 'smartphone',
                'features' => [
                    'Native iOS & Android',
                    'Cross-platform Development',
                    'API Integration',
                    'Push Notifications',
                    'Offline Capability',
                    'App Store Optimization'
                ],
                'starting_price' => 25000000,
                'order' => 3,
                'is_featured' => false
            ],
            [
                'title' => 'Digital Branding',
                'slug' => 'digital-branding',
                'short_description' => 'Strategi branding digital yang komprehensif untuk membangun identitas brand yang kuat di era digital.',
                'content' => 'Kami membantu mengembangkan identitas brand digital yang konsisten dan powerful. Dari logo design, brand guideline, hingga implementasi across all digital touchpoints, memastikan brand Anda memorable dan impactful.',
                'icon' => 'trending-up',
                'features' => [
                    'Brand Strategy',
                    'Logo & Visual Identity',
                    'Brand Guidelines',
                    'Digital Asset Creation',
                    'Social Media Kit',
                    'Brand Implementation'
                ],
                'starting_price' => 12000000,
                'order' => 4,
                'is_featured' => true
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
