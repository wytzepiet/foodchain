function opacities(color: string) {
  const opacities = Array(20)
    .fill(0)
    .map((_, i) => i * 5);
  return {
    DEFAULT: color,
    opacity: {
      ...Object.fromEntries(
        opacities.map((i) => [
          i.toString(),
          `color-mix(in srgb, ${color}, transparent ${100 - i}%)`,
        ])
      ),
    },
  };
}

const colors = {
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: {
    ...opacities("var(--primary)"),
    foreground: opacities("var(--primary-foreground)"),
  },
  secondary: {
    ...opacities("var(--secondary)"),
    foreground: opacities("var(--secondary-foreground)"),
  },
  destructive: {
    ...opacities("var(--destructive)"),
    foreground: opacities("var(--destructive-foreground)"),
  },
  muted: {
    ...opacities("var(--muted)"),
    foreground: opacities("var(--muted-foreground)"),
  },
  accent: {
    ...opacities("var(--accent)"),
    foreground: opacities("var(--accent-foreground)"),
  },
  popover: {
    ...opacities("var(--popover)"),
    foreground: opacities("var(--popover-foreground)"),
  },
  card: {
    ...opacities("var(--card)"),
    foreground: opacities("var(--card-foreground)"),
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "src/routes/**/*.{ts,tsx}",
    // "src/components/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...colors,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--kb-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--kb-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.1s ease-out",
        "accordion-up": "accordion-up 0.1s ease-out",
        "collapsible-down": "collapsible-down 0.1s ease-out",
        "collapsible-up": "collapsible-up 0.1s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
