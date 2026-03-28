import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Legacy colors (keep for backward compat) ──
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Legacy palette — used across existing pages
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F4E5A5",
          olive: "#8B7F3C",
        },
        charcoal: {
          DEFAULT: "#3D3D3D",
          dark: "#2A2A2A",
          light: "#4A4545",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          dark: "#F0EBE3",
        },

        // ── New luxury design system ──
        "bg-primary": "#0A0A0A",
        "bg-secondary": "#111111",
        "bg-elevated": "#1A1A1A",
        "bg-subtle": "#0D0D0D",

        "gold-primary": "#C9A84C",
        "gold-light": "#E2C972",
        "gold-dark": "#8B7132",

        "text-primary": "#FFFFFF",
        "text-secondary": "#B8B8B8",
        "text-muted": "#6B6B6B",
        "text-gold": "#C9A84C",

        success: "#4CAF50",
        error: "#E53935",
        warning: "#F9A825",

        "bg-light": "#F5F0E8",
        "text-on-light": "#1A1A1A",
      },

      // ── Spacing ──
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
        section: "128px",
      },

      // ── Font families ──
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        body: ["var(--font-body)", "Outfit", "sans-serif"],
        accent: ["var(--font-accent)", "Cormorant Garamond", "serif"],
      },

      // ── Fluid type scale ──
      fontSize: {
        hero: "clamp(3rem, 8vw, 7rem)",
        h1: "clamp(2.5rem, 5vw, 4.5rem)",
        h2: "clamp(2rem, 4vw, 3.5rem)",
        h3: "clamp(1.5rem, 3vw, 2rem)",
        h4: "clamp(1.125rem, 2vw, 1.5rem)",
        body: "clamp(1rem, 1.5vw, 1.125rem)",
        small: "clamp(0.875rem, 1vw, 1rem)",
        overline: "0.75rem",
      },

      // ── Border radius ──
      borderRadius: {
        card: "12px",
      },

      // ── Box shadow ──
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.5)",
        gold: "0 0 20px rgba(201,168,76,0.15)",
      },

      // ── Keyframes ──
      keyframes: {
        "gold-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // ── Animation utilities ──
      animation: {
        "gold-shimmer": "gold-shimmer 3s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
