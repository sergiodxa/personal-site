module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "visited"],
  },
  plugins: [],
};
