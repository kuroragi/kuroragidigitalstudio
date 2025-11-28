<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        
        $posts = [
            [
                'title' => 'The Future of Web Development: Trends to Watch in 2024',
                'slug' => 'future-web-development-trends-2024',
                'excerpt' => 'Explore the cutting-edge technologies and methodologies that are reshaping the web development landscape this year.',
                'content' => '# The Future of Web Development: Trends to Watch in 2024\n\nWeb development terus berkembang dengan pesat. Dari AI-powered development tools hingga serverless architecture, mari kita explore trend-trend yang akan mendominasi industri ini.\n\n## 1. AI-Assisted Development\n\nArtificial Intelligence semakin terintegrasi dalam development workflow. Tools seperti GitHub Copilot dan ChatGPT mengubah cara developer menulis code...\n\n## 2. Jamstack Evolution\n\nJamstack bukan lagi sekadar trend, tetapi sudah menjadi standard untuk modern web applications...\n\n## 3. WebAssembly Mainstream Adoption\n\nPerforma near-native di web browser membuka peluang baru untuk aplikasi yang sebelumnya mustahil...',
                'cover_image' => 'blog/web-dev-trends-2024.jpg',
                'tags' => ['Web Development', 'Technology', 'AI', 'Jamstack', 'WebAssembly'],
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'read_time' => 8,
                'views' => 1250,
                'author_id' => $admin->id
            ],
            [
                'title' => 'Building Scalable Microservices with Laravel and Docker',
                'slug' => 'scalable-microservices-laravel-docker',
                'excerpt' => 'Learn how to architect and deploy microservices using Laravel framework and Docker containerization for enterprise-scale applications.',
                'content' => '# Building Scalable Microservices with Laravel and Docker\n\nMicroservices architecture telah menjadi pilihan utama untuk aplikasi enterprise modern. Artikel ini akan membahas implementasi praktis menggunakan Laravel dan Docker.\n\n## Why Microservices?\n\nMonolithic applications memiliki limitations dalam hal scalability dan maintainability. Microservices menawarkan solusi dengan memecah aplikasi menjadi services yang independen...\n\n## Laravel as Microservice Framework\n\nLaravel menyediakan tools yang excellent untuk microservices development...',
                'cover_image' => 'blog/microservices-laravel.jpg',
                'tags' => ['Laravel', 'Microservices', 'Docker', 'Architecture', 'DevOps'],
                'status' => 'published',
                'published_at' => now()->subDays(12),
                'read_time' => 12,
                'views' => 892,
                'author_id' => $admin->id
            ],
            [
                'title' => 'UX Design Principles for Indonesian Market: Cultural Considerations',
                'slug' => 'ux-design-indonesian-market',
                'excerpt' => 'Understanding cultural nuances and user behavior patterns specific to Indonesian users for better UX design decisions.',
                'content' => '# UX Design Principles for Indonesian Market\n\nDesigning untuk pasar Indonesia requires understanding yang mendalam tentang cultural context, user behavior, dan technological landscape yang unik.\n\n## Cultural Context in Design\n\nIndonesia adalah negara dengan diversity yang sangat tinggi. Setiap region memiliki karakteristik unik yang perlu dipertimbangkan dalam design decisions...\n\n## Mobile-First Reality\n\nDengan penetrasi smartphone yang tinggi, mobile-first approach bukan lagi optional...\n\n## Trust and Security Perception\n\nKepercayaan adalah faktor kunci dalam digital adoption di Indonesia...',
                'cover_image' => 'blog/ux-indonesian-market.jpg',
                'tags' => ['UX Design', 'Indonesia', 'Cultural Design', 'User Research'],
                'status' => 'published',
                'published_at' => now()->subDays(18),
                'read_time' => 10,
                'views' => 674,
                'author_id' => $admin->id
            ],
            [
                'title' => 'Digital Transformation Success Stories: Lessons from Indonesian Enterprises',
                'slug' => 'digital-transformation-indonesian-enterprises',
                'excerpt' => 'Case studies and key insights from successful digital transformation initiatives across various industries in Indonesia.',
                'content' => '# Digital Transformation Success Stories\n\nDigital transformation bukan sekadar adopsi teknologi, tetapi perubahan fundamental dalam business model dan operational processes.\n\n## Case Study 1: Traditional Banking to Digital-First\n\nSalah satu bank terbesar di Indonesia berhasil mentransformasi legacy systems mereka...\n\n## Key Success Factors\n\n1. **Leadership Commitment**: Top-down support crucial untuk transformation success\n2. **Cultural Change**: Mengubah mindset organization dari traditional ke digital-first\n3. **Gradual Implementation**: Phased approach mengurangi risks dan resistance',
                'cover_image' => 'blog/digital-transformation.jpg',
                'tags' => ['Digital Transformation', 'Enterprise', 'Case Study', 'Business Strategy'],
                'status' => 'published',
                'published_at' => now()->subDays(25),
                'read_time' => 15,
                'views' => 1456,
                'author_id' => $admin->id
            ],
            [
                'title' => 'Optimizing React Performance: Advanced Techniques and Best Practices',
                'slug' => 'optimizing-react-performance-advanced',
                'excerpt' => 'Deep dive into advanced React optimization techniques including code splitting, memoization, and bundle analysis.',
                'content' => '# Optimizing React Performance: Advanced Techniques\n\nPerformance optimization adalah aspect crucial dalam React development. Artikel ini covers advanced techniques untuk mengoptimalkan React applications.\n\n## Understanding React Rendering\n\nSebelum optimization, penting untuk memahami bagaimana React rendering works...\n\n## Code Splitting Strategies\n\nCode splitting allows you to split your code into smaller bundles...\n\n## Memoization Techniques\n\nReact.memo, useMemo, dan useCallback adalah tools powerful untuk preventing unnecessary re-renders...',
                'cover_image' => 'blog/react-performance.jpg',
                'tags' => ['React', 'Performance', 'JavaScript', 'Frontend'],
                'status' => 'draft',
                'published_at' => null,
                'read_time' => 14,
                'views' => 0,
                'author_id' => $admin->id
            ]
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
