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
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4E5A5',
          olive: '#8B7F3C',
        },
        // Warmer, more elegant palette
        charcoal: {
          DEFAULT: '#3D3D3D',
          dark: '#2A2A2A',
          light: '#4A4545',
        },
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#F0EBE3',
        },
      },
    },
  },
  plugins: [],
};
export default config;
