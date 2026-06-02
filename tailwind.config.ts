import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        platinum: "#FFFFFF",
        graphite: "#A3A3A3",
        voltage: "#3B82F6"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"]
      },
      letterSpacing: {
        luxury: "0"
      },
      boxShadow: {
        voltage: "0 0 90px rgba(59, 130, 246, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
