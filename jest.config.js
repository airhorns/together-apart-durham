require("dotenv").config();
if (!process.env.CURRENT_SITE) process.env.CURRENT_SITE = "ottawa";

module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/test/config/cssTransform.js",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es|react-blurhash)", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
