import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'crema': '#FFF8F0',
        'crema-light': '#FFFBF5',
        'crema-dark': '#F5EFE7',
        'dorado': '#D4AF37',
        'dorado-light': '#E5C158',
        'dorado-dark': '#B8941F',
        'rojo-suave': '#D99999',
        'rojo-suave-light': '#E8A5A5',
        'rojo-suave-dark': '#C77777',
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
