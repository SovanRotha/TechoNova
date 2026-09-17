/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette — grounded in soil, leaf and harvest, not generic SaaS tones.
        soil: {
          50: "#F8F4EC",
          100: "#EFE7D6",
          200: "#DCCBA8",
          400: "#A98A5B",
          600: "#8B6F47",
          800: "#5C4A31",
          900: "#3B2F20",
        },
        leaf: {
          50: "#EEF3EA",
          100: "#D9E6D1",
          200: "#AECB9C",
          400: "#5F9B58",
          500: "#3F7D4F",
          600: "#2F6A40",
          700: "#245331",
          800: "#1F3D2B",
          900: "#152A1E",
        },
        harvest: {
          100: "#F7E8C4",
          400: "#E0B24E",
          500: "#D9A441",
          600: "#B5842C",
        },
        clay: {
          400: "#C97B4A",
          500: "#B8632E",
        },
        canvas: "#F7F4EC",
        ink: "#21261F",
        alert: "#B3452C",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["\"Work Sans\"", "system-ui", "sans-serif"],
      },
      borderRadius: {
        farmer: "22px",
        buyer: "10px",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(33, 38, 31, 0.06)",
        lifted: "0 8px 24px rgba(33, 38, 31, 0.10)",
      },
    },
  },
  plugins: [],
};
