<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }}</title>

    <!-- Preconnect untuk performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Google Fonts - Cinzel untuk headings, Inter untuk body -->
    <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <!-- Meta tags untuk SEO -->
    <meta name="description"
        content="Kuroragi Digital Studio - Shaping Ideas Into Digital Mastery. Premium digital agency untuk korporat, UMKM, dan pemerintah.">
    <meta name="keywords" content="digital agency, web development, UI/UX design, branding, Indonesia">
    <meta name="author" content="Kuroragi Digital Studio">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ config('app.url') }}">
    <meta property="og:title" content="{{ config('app.name') }}">
    <meta property="og:description" content="Shaping Ideas Into Digital Mastery">
    <meta property="og:image" content="{{ config('app.url') }}/og-image.jpg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ config('app.url') }}">
    <meta property="twitter:title" content="{{ config('app.name') }}">
    <meta property="twitter:description" content="Shaping Ideas Into Digital Mastery">
    <meta property="twitter:image" content="{{ config('app.url') }}/og-image.jpg">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- CSRF Token untuk API calls -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Dark mode preference -->
    <script>
        // Set dark mode as default, respect system preference
        if (!localStorage.theme) {
            localStorage.theme = 'dark'
        }
        
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="bg-primary-bg text-primary-text antialiased">
    <!-- React app akan di-mount di sini -->
    <div id="app"></div>
</body>

</html>