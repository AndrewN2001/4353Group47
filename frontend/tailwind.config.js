const withMT = require("@material-tailwind/react/utils/withMT")

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryblue: {
          light: "#5b92bf",
          DEFAULT: "#4682B4"
        },
        accentyellow: {
          DEFAULT: "#ADB446",
          light: '#c7cc7c'
        }
      }
    },
  },
  plugins: [],
});

