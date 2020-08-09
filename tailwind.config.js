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
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme("colors.gray.100"),
            h2: {
              color: theme("colors.orange.500"),
            },
            a: {
              color: theme("colors.orange.500"),
              textWeight: theme("font.weight.semibold"),
              "&:hover": {
                color: theme("colors.orange.500"),
                textDecoration: "none",
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    padding: ["responsive", "first", "last"],
    textColor: ["responsive", "hover", "focus", "visited"],
  },
  plugins: [require("@tailwindcss/typography")],
};
