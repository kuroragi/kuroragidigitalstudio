/**
 * Bootstrap file untuk konfigurasi global
 * Load axios dan konfigurasi CSRF
 */

import axios from "axios";

// Setup axios defaults
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Setup CSRF token
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-token"
    );
}

// Setup axios interceptors untuk handle authentication errors
window.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized - redirect to login atau clear auth state
            console.warn("Unauthorized access - user session expired");
        }
        return Promise.reject(error);
    }
);

// Setup base URL untuk API calls
window.axios.defaults.baseURL = "/api/v1";
