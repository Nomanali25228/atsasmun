/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        bounceCustom: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotateCard: {
          "0%, 100%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
        },
      },
      animation: {
        "bounce-custom": "bounceCustom 1s infinite",
        "floating-card": "float 4s ease-in-out infinite",
        "fade-in": "fadeIn 1.5s ease-out",
        "rotate-card": "rotateCard 8s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".animation-delay-200": { animationDelay: "0.2s" },
        ".animation-delay-400": { animationDelay: "0.4s" },
        ".animation-delay-600": { animationDelay: "0.6s" },
      });
    }),
  ],
};