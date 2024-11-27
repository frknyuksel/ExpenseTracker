// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   darkMode: 'class', // dark mode'u class bazlı olarak etkinleştiriyoruz
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)", // arka plan rengini CSS değişkeniyle kontrol et
//         foreground: "var(--foreground)", // metin rengini CSS değişkeniyle kontrol et
//       },
//     },
//   },
//   plugins: [],
// };
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tarama yolları
  ],
  darkMode: "class", // Dark mode için class kullanımı
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        background: "var(--background)", // Global değişkenler
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
};
