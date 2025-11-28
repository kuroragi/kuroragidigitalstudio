<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Site configuration
            [
                'key' => 'site_name',
                'value' => 'Kuroragi Digital Studio',
                'type' => 'string',
                'description' => 'Website name displayed in headers and titles',
                'group' => 'site',
                'is_public' => true
            ],
            [
                'key' => 'site_tagline', 
                'value' => 'Shaping Ideas Into Digital Mastery',
                'type' => 'string',
                'description' => 'Main tagline for the website',
                'group' => 'site',
                'is_public' => true
            ],
            [
                'key' => 'site_description',
                'value' => 'Kuroragi Digital Studio adalah premium digital agency yang mengkhususkan diri dalam web development, mobile app development, UI/UX design, dan digital branding untuk korporat, UMKM, dan pemerintah.',
                'type' => 'string',
                'description' => 'Site description for SEO and about sections',
                'group' => 'site', 
                'is_public' => true
            ],
            
            // Animation settings
            [
                'key' => 'meteor_animation_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'description' => 'Enable/disable meteor canvas animation on homepage',
                'group' => 'animations',
                'is_public' => true
            ],
            [
                'key' => 'meteor_density',
                'value' => '50',
                'type' => 'number',
                'description' => 'Number of meteor particles (1-100)',
                'group' => 'animations',
                'is_public' => true
            ],
            [
                'key' => 'meteor_speed',
                'value' => '1.0',
                'type' => 'number',
                'description' => 'Meteor animation speed multiplier',
                'group' => 'animations',
                'is_public' => true
            ],
            [
                'key' => 'parallax_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'description' => 'Enable/disable parallax scrolling effects',
                'group' => 'animations',
                'is_public' => true
            ],
            
            // Contact settings
            [
                'key' => 'contact_email',
                'value' => 'hello@kuroragidigital.studio',
                'type' => 'string',
                'description' => 'Primary contact email address',
                'group' => 'contact',
                'is_public' => true
            ],
            [
                'key' => 'contact_phone',
                'value' => '+62 812-3456-7890',
                'type' => 'string',
                'description' => 'Primary contact phone number',
                'group' => 'contact',
                'is_public' => true
            ],
            [
                'key' => 'office_address',
                'value' => 'Jl. Digital Innovation No. 123, Bandung, West Java 40132',
                'type' => 'string',
                'description' => 'Office address',
                'group' => 'contact',
                'is_public' => true
            ],
            
            // Social media
            [
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/kuroragidigital',
                'type' => 'string',
                'description' => 'Instagram profile URL',
                'group' => 'social',
                'is_public' => true
            ],
            [
                'key' => 'social_linkedin',
                'value' => 'https://linkedin.com/company/kuroragi-digital-studio',
                'type' => 'string',
                'description' => 'LinkedIn company page URL',
                'group' => 'social',
                'is_public' => true
            ],
            [
                'key' => 'social_github',
                'value' => 'https://github.com/kuroragidigital',
                'type' => 'string',
                'description' => 'GitHub organization URL',
                'group' => 'social', 
                'is_public' => true
            ],
            
            // Admin settings
            [
                'key' => 'admin_email',
                'value' => 'admin@kuroragidigital.studio',
                'type' => 'string',
                'description' => 'Email address for admin notifications',
                'group' => 'admin',
                'is_public' => false
            ],
            [
                'key' => 'contact_form_notifications',
                'value' => 'true',
                'type' => 'boolean',
                'description' => 'Send email notifications for new contact form submissions',
                'group' => 'admin',
                'is_public' => false
            ],
            
            // Company info
            [
                'key' => 'company_founded_year',
                'value' => '2020',
                'type' => 'number',
                'description' => 'Year the company was founded',
                'group' => 'company',
                'is_public' => true
            ],
            [
                'key' => 'projects_completed',
                'value' => '150',
                'type' => 'number',
                'description' => 'Number of completed projects',
                'group' => 'company',
                'is_public' => true
            ],
            [
                'key' => 'clients_served',
                'value' => '85',
                'type' => 'number',
                'description' => 'Number of clients served',
                'group' => 'company',
                'is_public' => true
            ]
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
