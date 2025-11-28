# Kuroragi Digital Studio - Project Overview

## Tentang Proyek

**Kuroragi Digital Studio** adalah website korporat yang dirancang dengan pendekatan dark-first, futuristik, dan misterius untuk menarik klien korporat, UMKM, pemerintah, dan masyarakat umum Indonesia.

**Tagline**: "Shaping Ideas Into Digital Mastery"

## Arsitektur Teknis

### Stack Teknologi

-   **Backend**: Laravel (PHP)
-   **Frontend**: React (SPA)
-   **Database**: MySQL
-   **Styling**: Tailwind CSS
-   **Bundling**: Vite
-   **Authentication**: Laravel Sanctum (SPA)
-   **Repository**: Single-repo approach (Laravel + React dalam satu project)

### Struktur Proyek

```
Laravel Backend:
├── app/ (Controllers, Models, Middleware)
├── routes/ (web.php, api.php)
├── database/ (migrations, seeders)
└── resources/js/ (React frontend)

React Frontend:
├── src/
│   ├── main.jsx
│   ├── pages/ (Home, About, Services, Portfolio, Blog, Contact, PortalLogin)
│   ├── components/ (Hero, MeteorCanvas, ParallaxLayer, Card, Navbar, Footer, Admin/*)
│   └── styles/ (Tailwind imports)
└── vite.config.js
```

## Halaman & Fitur Utama

### 1. Home (/)

-   **Hero Section**: Full-screen dengan tagline besar + CTA
-   **Meteor Canvas**: Background animasi partikel meteor dengan HTML5 Canvas
-   **Parallax Sections**: Multiple layers dengan efek parallax
-   **Preview Sections**: Services, Portfolio, Blog snippets

### 2. About (/about)

-   Company story dengan "lore tersembunyi" (expandable)
-   Company facts dan statistics
-   Future: Team section

### 3. Services (/services)

-   Service cards dengan micro-animations
-   Hover effects dengan glow
-   CTA "Request Quote" pada setiap card

### 4. Portfolio (/portfolio)

-   Grid layout dengan filter berdasarkan kategori
-   Masonry/grid cards dengan parallax effect
-   Modal fullscreen untuk detail project
-   Hover effects dengan blue rim glow

### 5. Blog (/blog)

-   Listing dengan kategorisasi dan search
-   Summary cards
-   Rich content articles (MD/WYSIWYG)

### 6. Contact (/contact)

-   Form kontak (name, email, org, message, optional file)
-   Save ke database + kirim email ke admin
-   Success notification/modal

### 7. Portal Admin (/portal) - HIDDEN

-   **Tidak ada link publik** - akses manual via URL
-   Login dengan email/password
-   Dashboard overview: contacts, projects, posts
-   Management: portfolio, blog, services, contact messages
-   Protected dengan admin middleware

## Database Schema

### Core Tables:

1. **users**: id, name, email, password, role ['admin','user'], timestamps
2. **projects**: id, title, slug, category, thumbnail, gallery(json), description, client, year, status, created_by, timestamps
3. **services**: id, title, slug, short_desc, content, order, timestamps
4. **posts**: id, title, slug, excerpt, content, cover, published_at, author_id, timestamps
5. **contacts**: id, name, email, org, message, read_flag, created_at
6. **settings**: key, value (untuk feature toggles seperti meteor on/off)

## Design System

### Color Palette

-   **Background Primary**: #07070a (near-black)
-   **Surface/Cards**: #0f1115
-   **Primary Blue**: #1B82F4 (main accent)
-   **Accent Cyan**: #00D1FF (glow effects)
-   **Subtle Highlight**: #22313f
-   **Text Primary**: #E6EEF6 (soft white)
-   **Muted Text**: #9AA7B2

### Typography

-   **Headings**: Cinzel atau Cormorant Garamond (serif, misterius)
    -   H1: 56-72px (responsive)
    -   H2: 32-40px
-   **Body**: Inter atau Nunito Sans
    -   Body: 16px

### Layout & Spacing

-   **Container**: max-width 1200px dengan generous gutters
-   **Card Radius**: 12px dengan soft blurred glow
-   **Featured Cards**: 2xl rounded corners

## UX & Interactions

### Animations & Effects

1. **Parallax**: Multiple layers dengan `transform: translateY()` dan multipliers berbeda
2. **Meteor Animation**: HTML5 Canvas dengan random spawn, slow drift, glow tail, occasional big meteor
3. **Card Hover**: Subtle elevation + blue rim glow (#1B82F4)
4. **Section Reveal**: Fade-up + slight scale saat scroll
5. **Sticky Navigation**: Transparent over hero → solid setelah scroll

### Accessibility

-   **Reduced Motion**: Respect `prefers-reduced-motion` untuk disable animasi
-   **Performance**: Meteor canvas disabled pada low-power devices
-   **Form**: Proper validation dan sanitized inputs
-   **Images**: Alt text untuk semua gambar
-   **Contrast**: Memenuhi standar accessibility

## API Endpoints

### Public API:

-   `GET /api/projects` - Daftar portfolio
-   `POST /api/contacts` - Submit contact form
-   `GET /api/services` - Daftar layanan
-   `GET /api/posts` - Blog articles

### Auth API:

-   `POST /api/login` - Admin login
-   `POST /api/logout` - Admin logout

### Admin API (Protected):

-   Projects CRUD
-   Posts management
-   Services management
-   Contacts view/management

## Development Setup

### Prerequisites:

-   PHP 8.1+
-   Composer
-   Node.js & npm
-   MySQL

### Local Setup:

```bash
composer install
cp .env.example .env
# Edit .env untuk DB dan MAIL config
php artisan key:generate
php artisan migrate --seed
npm install
npm run dev
php artisan serve
```

### Development Notes:

-   **Local Development**: `artisan serve` + `npm run dev`
-   **Mail**: Mailtrap untuk development
-   **Queue**: Optional untuk email processing
-   **Build**: `npm run build` untuk production assets

## Target Audience & Tone

### Target:

-   Klien korporat
-   UMKM (Usaha Mikro Kecil Menengah)
-   Pemerintah
-   Masyarakat umum Indonesia

### Tone & Vibe:

-   **Dark & Professional**: Sophisticated, premium feel
-   **Futuristik**: Modern, cutting-edge technology
-   **Misterius**: Subtle intrigue, premium positioning
-   **Semi-formal**: Professional tapi approachable
-   **Cinematic**: Hero sections dengan dramatic effect

## Key Technical Features

### Performance Optimizations:

-   GPU acceleration dengan `transform: translate3d`
-   `requestAnimationFrame` untuk smooth animations
-   Responsive particle count berdasarkan screen size
-   Lazy loading untuk images

### Security:

-   Laravel Sanctum untuk SPA authentication
-   Admin middleware protection
-   Input sanitization dan validation
-   CSRF protection

### Responsiveness:

-   Mobile-first approach dengan Tailwind
-   Adaptive animations berdasarkan device capabilities
-   Responsive typography dan spacing

## Future Enhancements

-   Light theme toggle
-   Team section di About page
-   Advanced blog features (tags, comments)
-   Multi-language support
-   Performance analytics dashboard
