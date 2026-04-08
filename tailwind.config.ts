import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        // ── Design system tokens ──────────────────────────
        "bg-base":      "#080C14",
        "bg-deep":      "#0D1117",
        "bg-surface":   "#0F1623",
        "bg-elevated":  "#141C2E",
        "accent-primary": "#0066FF",
        "accent-glow":  "rgba(0,102,255,0.08)",
        "text-primary": "#F0F4FF",
        "text-secondary":"#8896B3",
        "text-muted":   "#4A5568",
        // ── shadcn / ui compat tokens ────────────────────
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Subtle depth — not glow
        "card":      "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover":"0 4px 16px rgba(0,0,0,0.4)",
        // Glow — for CTA buttons and focus states only
        "glow-sm":   "0 0 15px rgba(0, 102, 255, 0.15), 0 0 5px rgba(0, 102, 255, 0.1)",
        "glow-md":   "0 0 30px rgba(0, 102, 255, 0.25), 0 0 10px rgba(0, 102, 255, 0.15)",
        "glow-lg":   "0 0 60px rgba(0, 102, 255, 0.35), 0 0 20px rgba(0, 102, 255, 0.2)",
      },
      animation: {
        // Entrance — fast, physics-based
        "fade-up":        "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":        "fadeIn 0.35s ease-out forwards",
        "page-fade-in":   "pageFadeIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        // Utility
        "slide-down":     "slideDown 0.25s ease-out forwards",
        // Background
        "background-position-spin": "background-position-spin 3000ms infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pageFadeIn: {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "background-position-spin": {
          "0%":   { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
      },
      transitionTimingFunction: {
        "snappy": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "400": "400ms",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.03em",
        tight:    "-0.02em",
      },
    },
  },
  plugins: [animate],
};

export default config;
