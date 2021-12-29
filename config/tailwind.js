/* eslint-disable unicorn/prefer-module */
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",

  contents: ["./app/**/*.{ts,tsx}"],

  darkMode: "media",

  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
      },

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

      // typography(theme) {
      //   return {
      //     dark: {
      //       css: {
      //         color: theme("colors.gray.300"),
      //         '[class~="lead"]': {
      //           color: theme("colors.gray.400"),
      //         },
      //         a: {
      //           color: theme("colors.gray.100"),
      //         },
      //         strong: {
      //           color: theme("colors.gray.100"),
      //         },
      //         "ul > li::before": {
      //           backgroundColor: theme("colors.gray.700"),
      //         },
      //         hr: {
      //           borderColor: theme("colors.gray.800"),
      //         },
      //         blockquote: {
      //           color: theme("colors.gray.100"),
      //           borderLeftColor: theme("colors.gray.800"),
      //         },
      //         h1: {
      //           color: theme("colors.gray.100"),
      //         },
      //         h2: {
      //           color: theme("colors.gray.100"),
      //         },
      //         h3: {
      //           color: theme("colors.gray.100"),
      //         },
      //         h4: {
      //           color: theme("colors.gray.100"),
      //         },
      //         code: {
      //           color: theme("colors.gray.100"),
      //         },
      //         "a code": {
      //           color: theme("colors.gray.100"),
      //         },
      //         pre: {
      //           color: theme("colors.gray.200"),
      //           backgroundColor: theme("colors.gray.800"),
      //         },
      //         thead: {
      //           color: theme("colors.gray.100"),
      //           borderBottomColor: theme("colors.gray.700"),
      //         },
      //         "tbody tr": {
      //           borderBottomColor: theme("colors.gray.800"),
      //         },
      //         "h1 a": {
      //           fontWeight: theme("fontWeight.bold"),
      //         },
      //         "h2 a": {
      //           fontWeight: theme("fontWeight.bold"),
      //         },
      //         "h3 a": {
      //           fontWeight: theme("fontWeight.bold"),
      //         },
      //         "h4 a": {
      //           fontWeight: theme("fontWeight.bold"),
      //         },
      //         "h5 a": {
      //           fontWeight: theme("fontWeight.bold"),
      //         },
      //         "h6 a": {
      //           fontWeight: theme("fontWeight.bold"),
      //         },
      //       },
      //     },
      //   };
      // },
    },
  },

  variants: {
    extend: {
      padding: ["first", "last"],
      typography: ["dark"],
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
