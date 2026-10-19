/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        codiarg: {
          sky: '#0096F6',
          azure: '#0074D9',
          deep: '#061B33',
          navy: '#0A2542',
          ice: '#BAE6FD',
          leaf: '#58CC02',
          leafLight: '#84CC16',
        },
      },
    },
  },
  plugins: [],
};
