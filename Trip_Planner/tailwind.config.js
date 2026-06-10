/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#2C3E50",
        "neon-green": "#10B981",
      },
      // You may also need custom shadows for the full Neumorphic look:
      boxShadow: {
        "inner-neumorphic":
          "inset 5px 5px 10px #f0f0f0, inset -5px -5px 10px #ffffff",
      },
    },
  },
  plugins: [],
};
