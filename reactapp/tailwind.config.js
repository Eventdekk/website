/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      colors: {
        midnight: "#010027",
        midnight2: "#1d1c52",
        midnight3: "#020124",

        primary: "#f94a1b",
        secondary: "#3e57d8",
      },
      fontFamily: {
        beam: ["beam", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
