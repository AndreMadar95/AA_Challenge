/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        polar: "#eef6fb",
      },
      textColor: {
        "oslo-gray": "#91959a",
        "piction-blue": "#5aaee7",
      },
      fontSize: {
        "3xl": "2rem",
      },
      minHeight: {
        "fixed-xl": "300px",
      },
      fontFamily: {
        temperature: "Teko",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
  },
  plugins: [],
};
