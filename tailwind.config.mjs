/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

      },
      backgroundImage: {
        'fundo-claro': "url('/images/fundo_claro.svg')",
        'fundo-escuro': "url('/images/fundo_escuro.svg')",
      },
    },
  },
  plugins: [],
};
