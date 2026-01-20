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
        charcoal: {
          DEFAULT: '#2D3748',
          dark: '#1A202C',
        },
        cream: '#F7FAFC',
      },
    },
  },
  plugins: [],
};
export default config;
