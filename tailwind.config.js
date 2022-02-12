const { transform } = require("windicss/helpers");

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "material-icons": ["Material Icons", "sans-serif"],
      },
    },
  },
  plugins: [transform("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
