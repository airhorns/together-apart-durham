require("dotenv").config();
if (!process.env.CURRENT_SITE) process.env.CURRENT_SITE = "ottawa";

module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/test/config/cssTransform.js",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es|react-blurhash)", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
};
