const nextJest = require("next/jest"); // eslint-disable-line

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/context/(.*)$": "<rootDir>/context/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/mocks/(.*)$": "<rootDir>/mocks/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1", // Adjust path as needed
    "^@nulib/use-markdown$": "<rootDir>/mocks/use-markdown.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
