Sitemap final (prioritas)

/ — Home (Hero cinematic + meteor background + parallax sections)

/about — About / Company story (ada lore singkat tapi tersembunyi)

/services — Layanan (cards + CTA contact)

/portfolio — Grid card + filter + parallax reveal

/blog — List artikel (summary cards)

/contact — Form kontak (email + DB logging + notifikasi)

/portal — Hidden login/admin panel (tidak linked di nav; buka manual)

API endpoints (Laravel) untuk: projects, posts, contact, auth, admin

Komponen UI / Section per halaman

Home

Hero full-screen: judul besar (tagline Shaping Ideas Into Digital Mastery), subjudul, CTA primary (Contact / Request Quote)

Meteor canvas layer: particle/meteor system, random spawn (sesekali jatuh)

Parallax intro: tagline + short features

Services preview: 3–4 card (hover glow)

Portfolio preview: horizontal band + carousel/cta ke portfolio

Latest blog strip

Footer with legal + minimal link (jangan link /portal)

About

Split layout: lore tersembunyi (expandable toggle) + company facts (years, clients)

Team strip (future)

Services

Service cards with micro-animations & “Request Quote” CTA

Portfolio

Filter controls (category chips)

Masonry / grid of cards (parallax effect on scroll)

Card hover: reveal quick meta + view detail modal (fullscreen preview option)

Blog

Listing page with categories & search

Article page with rich content (MD / WYSIWYG backend)

Contact

Contact form (name, email, org, message, file attachment optional)

On submit: save to DB + send email to admin + show success modal/notification

Portal (Hidden)

/portal — login (email/password)

Admin dashboard (overview: contacts, projects, posts)

Admin features: manage portfolio, blog, services, view contact messages

Route protected by admin middleware; no public links

UX / Interactions / Animations (Behavior)

Dark-first design; prefer reduced-motion accessible path

Parallax: multiple layers — background (meteor canvas), mid (background pattern), foreground (content). Use transform: translateY() with different multipliers on scroll.

Meteor animation: HTML5 Canvas (or WebGL light) — random spawn, slow drift, glow tail; occasionally a bigger meteor for cinematic effect.

Card hover: subtle elevating transform + blue rim glow (#1B82F4)

Section reveal: fade-up + slight scale (on-scroll)

Sticky minimal nav (transparent over hero, then solid after scroll)

Hidden login: not in nav; accessible via direct URL /portal only

Visual Style Guide (practical)

Palette

Background primary: #07070a (near-black)

Surface / cards: #0f1115

Primary blue: #1B82F4 (main accent)

Accent cyan (glow): #00D1FF

Subtle highlight: #22313f (muted)

Text primary: #E6EEF6 (soft white)

Muted text: #9AA7B2

Typography

Headings (misterius serif): use Cinzel or Cormorant Garamond (serif, semi-decorative) — big, tracking-tight

Body (readable sans): Inter or Nunito Sans

Sizes: H1 56–72px (responsive), H2 32–40px, Body 16px

Spacing & Layout

Base container width: max-width: 1200px with generous gutters

Card radius: 12px with soft blurred glow on hover

Use 2xl rounded corners on featured cards / modals

Dark Mode Behavior

Default dark; ensure contrast ratios for accessibility

Optional light theme via toggle (later)

Icons & Imagery

Use thin-line icons + occasional glyphs that look "arcane" (custom svg rune accents)

Portfolio thumbnails: darkened with neon-blue accent on hover

Accessibility & Performance notes

Provide reduced-motion setting respecting prefers-reduced-motion

Provide alt text for images, proper form validation, sanitized inputs

Meteor canvas should be disabled on low-power devices or via setting

Database schema (core)

Tables (migrations)

users (id, name, email, password, role ['admin','user'], timestamps)

projects (id, title, slug, category, thumbnail, gallery(json), description, client, year, status, created_by, timestamps)

services (id, title, slug, short_desc, content, order, timestamps)

posts (id, title, slug, excerpt, content, cover, published_at, author_id, timestamps)

contacts (id, name, email, org, message, read_flag, created_at)

settings (key, value) — for feature toggles (like meteor on/off)

Struktur folder (Laravel + React single-repo approach)

Recommended: Laravel backend + React frontend living in resources/js (Vite) so deployable together.

Project root

app/ (Laravel)

routes/ (web.php, api.php)

resources/js/

src/

main.jsx (mount point)

pages/ (Home.jsx, About.jsx, Services.jsx, Portfolio.jsx, Blog.jsx, Contact.jsx, PortalLogin.jsx)

components/ (Hero.jsx, MeteorCanvas.jsx, ParallaxLayer.jsx, Card.jsx, Modal.jsx, Navbar.jsx, Footer.jsx, Admin/\*)

styles/ (tailwind imports)

vite.config.js

resources/views/ minimal blade to mount react app (e.g., app.blade.php)

webpack or vite build for assets

Auth

Use Laravel Sanctum for SPA auth (login at /portal posts to API, set cookie)

Admin middleware guards backend routes

Dev & Deployment Notes

Local first (artisan serve + npm run dev), later build assets for shared hosting (npm run build).

DB: MySQL (migrations + seeders)

Mail: local mailtrap for dev, configurable in .env

Use queue for email (optional)
