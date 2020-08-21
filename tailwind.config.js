module.exports = {
  purge: ["./src/**/*.tsx"],
  theme: {
    extend: {
      maxWidth: {
        prose: "65ch",
      },
      inset: {
        full: "100%",
      },
    },
  },
  variants: {
    padding: ["responsive", "first", "last"],
    textColor: ["responsive", "hover", "focus", "visited"],
  },
  plugins: [require("@tailwindcss/typography")],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true,
  },
};
