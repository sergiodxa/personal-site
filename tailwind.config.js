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
      scale: {
        500: "5",
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
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
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
  },
};
