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
          "secondary": "#ececec",
          "accent": "#0056b3",
          "neutral": "#f8f8f8",
          "base-100": "#ffffff",

          "--gold": "#c99a3f",
          "--cool-gray": "#ececec",
          "--royal-blue": "#0056b3",
          "--soft-white": "#f8f8f8",
          "--pure-white": "#ffffff",

          "--primary-soft": "rgba(201, 154, 63, 0.1)",
          "--secondary-soft": "rgba(236, 236, 236, 0.1)",
          "--accent-soft": "rgba(0, 86, 179, 0.1)",
          "--base-neutral": "#f2f2f2",
        },
      },
      {
        myluxuryred: {
          "primary": "#B22222",
          "secondary": "#F5E0DC",
          "accent": "#7D1313",
          "neutral": "#FAF3F3",
          "base-100": "#ffffff",

          "--gold": "#8B0000",
          "--cool-gray": "#F5E0DC",
          "--royal-blue": "#9D1313",
          "--soft-white": "#FAF3F3",
          "--pure-white": "#ffffff",

          "--primary-soft": "rgba(178, 34, 34, 0.1)",
          "--secondary-soft": "rgba(245, 224, 220, 0.1)",
          "--accent-soft": "rgba(125, 19, 19, 0.1)",
          "--base-neutral": "#F8EAEA",
        },
      },
      {
        myluxurygreen: {
          "primary": "#2E8B57",
          "secondary": "#D4EED1",
          "accent": "#1E5631",
          "neutral": "#EFFAF3",
          "base-100": "#ffffff",

          "--gold": "#2E8B57",
          "--cool-gray": "#D4EED1",
          "--royal-blue": "#1E5631",
          "--soft-white": "#EFFAF3",
          "--pure-white": "#ffffff",

          "--primary-soft": "rgba(46, 139, 87, 0.1)",
          "--secondary-soft": "rgba(212, 238, 209, 0.1)",
          "--accent-soft": "rgba(30, 86, 49, 0.1)",
          "--base-neutral": "#E5F5E8",
        },
      },
      {
        myluxurypurple: {
          "primary": "#6A0DAD",
          "secondary": "#E8D5F5",
          "accent": "#4B0082",
          "neutral": "#F7F0FA",
          "base-100": "#ffffff",

          "--gold": "#6A0DAD",
          "--cool-gray": "#E8D5F5",
          "--royal-blue": "#4B0082",
          "--soft-white": "#F7F0FA",
          "--pure-white": "#ffffff",

          "--primary-soft": "rgba(106, 13, 173, 0.1)",
          "--secondary-soft": "rgba(232, 213, 245, 0.1)",
          "--accent-soft": "rgba(75, 0, 130, 0.1)",
          "--base-neutral": "#F0E6F7",
        },
      },
      {
        myluxuryblue: {
          "primary": "#1E3A8A",
          "secondary": "#CBD5E1",
          "accent": "#0F172A",
          "neutral": "#E0F2FE",
          "base-100": "#ffffff",

          "--gold": "#1E3A8A",
          "--cool-gray": "#CBD5E1",
          "--royal-blue": "#0F172A",
          "--soft-white": "#E0F2FE",
          "--pure-white": "#ffffff",

          "--primary-soft": "rgba(30, 58, 138, 0.1)",
          "--secondary-soft": "rgba(203, 213, 225, 0.1)",
          "--accent-soft": "rgba(15, 23, 42, 0.1)",
          "--base-neutral": "#D7E7F9",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        "gold": "var(--gold)",
        "cool-gray": "var(--cool-gray)",
        "royal-blue": "var(--royal-blue)",
        "soft-white": "var(--soft-white)",
        "pure-white": "var(--pure-white)",

        "primary-soft": "var(--primary-soft)",
        "secondary-soft": "var(--secondary-soft)",
        "accent-soft": "var(--accent-soft)",
        "base-neutral": "var(--base-neutral)",
      },
    },
  },
}
