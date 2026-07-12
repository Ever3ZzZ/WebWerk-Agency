/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F8F7F4",
        ink: "#111111",
        copper: "#A35A3A",
        moss: "#6E735D",
        porcelain: "#ECE8DE",
        smoke: "#D8D2C6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 17, 17, 0.08)",
        line: "inset 0 0 0 1px rgba(17, 17, 17, 0.08)",
      },
    },
  },
  plugins: [],
};
