module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: {},
      textColor: {},
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "visited"],
  },
  plugins: [],
};
