/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "node_modules/react-daisyui/dist/**/*.js",
  "node_modules/daisyui/dist/**/*.js",
],
plugins: [require('daisyui')],
daisyui: {
  themes: [
    {
      mytheme: {
        "primary": "#6f42c1", 
        "primary-content": "#ffffff",
        "secondary": "#007bff",
        "secondary-content": "#ffffff",
        "accent": "#17a2b8",
        "accent-content": "#ffffff",
        "neutral": "#f8f9fa",
        "neutral-content": "#212529",
        "base-100": "#ffffff",
        "base-content": "#212529",
        "info": "#6610f2",
        "success": "#28a745",
        "warning": "#ffc107",
        "error": "#dc3545",
      },
    },
  ],
},
theme: {
  extend: {
    colors: {
      "primary-soft": "rgba(111, 66, 193, 0.1)",
      "secondary-soft": "rgba(0, 123, 255, 0.1)",
      "accent-soft": "rgba(23, 162, 184, 0.1)",
      "base-neutral": "#E3F2FD"
    },
  },
},
}