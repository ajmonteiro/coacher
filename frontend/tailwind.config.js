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
        myluxuryfitness: {
          "primary": "#c99a3f", 
          "primary-content": "#ffffff",

          "secondary": "#ececec",
          "secondary-content": "#333333",

          "accent": "#0056b3",
          "accent-content": "#ffffff",

          "neutral": "#f8f8f8",
          "neutral-content": "#222222",

          "base-100": "#ffffff",
          "base-content": "#222222",

          "info": "#1e40af", 
          "success": "#198754",
          "warning": "#ff9800",
          "error": "#dc3545",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        "gold": "#c99a3f",
        "cool-gray": "#ececec",
        "royal-blue": "#0056b3",
        "soft-white": "#f8f8f8",
        "pure-white": "#ffffff",

        // Soft Variants for a Premium Look
        "primary-soft": "rgba(201, 154, 63, 0.1)",
        "secondary-soft": "rgba(236, 236, 236, 0.1)",
        "accent-soft": "rgba(0, 86, 179, 0.1)",
        "base-neutral": "#f2f2f2"
      },
    },
  },
}
