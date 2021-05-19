import type { Config } from "@jest/types";
// eslint-disable-next-line unicorn/prefer-node-protocol
// eslint-disable-next-line unicorn/import-style
import * as path from "path";

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: path.resolve("."),
  collectCoverageFrom: ["app/**/*.ts", "app/**/*.tsx"],
  setupFilesAfterEnv: ["<rootDir>/config/jest/setup.js"],
  testMatch: ["<rootDir>/test/**/*.test.tsx", "<rootDir>/test/**/*.test.ts"],
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      { configFile: "./config/jest/babel.config.js" },
    ],
  },
};

export default config;
