import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        "bounce-shine": {
          "0%, 100%": { 
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
            filter: "brightness(1.2)"
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
            filter: "brightness(0.9)"
          }
        },
        "shine": {
          "0%": {
            "background-position": "200% 50%",
            opacity: "0.5"
          },
          "50%": {
            opacity: "1"
          },
          "100%": {
            "background-position": "-200% 50%",
            opacity: "0.5"
          }
        },
        "sparkle": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)"
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(0.8)"
          }
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "200% 50%",
            "transform": "scale(1.5)",
          },
          "50%": {
            "background-position": "0% 50%",
            "transform": "scale(1)",
          },
        },
        "move-forever": {
          "0%": { transform: "translate3d(-100%, 0, 0)" },
          "100%": { transform: "translate3d(100%, 0, 0)" },
        },
        "float-0": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(100px, 100px)" },
        },
        "float-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-150px, -50px)" },
        },
        "float-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(50px, -100px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite linear",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-slow": "gradient-x 30s ease infinite",
        "gradient-slow-reverse": "gradient-x 30s ease-in-out infinite reverse",
        "gradient-xy": "gradient-x 15s ease infinite, float-1 20s ease-in-out infinite",
        "move-forever": "move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite",
        "float-slow": "float-1 20s ease-in-out infinite",
        "pulse-delayed": "pulse 4s ease-in-out infinite 1s",
        "pulse-delayed-2": "pulse 4s ease-in-out infinite 2s",
        "bounce-shine": "bounce-shine 2s infinite",
        "shine": "shine 4s linear infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "float-bounce": "bounce-shine 3s ease-in-out infinite",
        "shine-fast": "shine 2s linear infinite"
      },
    },
  },
  plugins: [animate],
}

export default config
