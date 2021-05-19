/* eslint-disable unicorn/prefer-module */
module.exports = {
  overrides: [
    {
      files: ["*.spec.ts"],
      rules: {
        "jest/expect-expect": "off",
        "testing-library/await-async-query": "off",
        "testing-library/prefer-screen-queries": "off",
      },
    },
  ],
};
