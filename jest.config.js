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
    // @nulib/clover is ESM-only (exports has only an `import` condition).
    "^@nulib/clover$": "<rootDir>/node_modules/@nulib/clover/dist/index.mjs",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests/"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// ESM-only packages that Jest must transform rather than load as CommonJS.
const esmPackages = ["@nulib/clover", "@iiif/parser"];

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();
  config.transformIgnorePatterns = [
    `/node_modules/(?!(${esmPackages.join("|")})/)`,
    ...config.transformIgnorePatterns.filter(
      (pattern) => !pattern.includes("node_modules"),
    ),
  ];
  return config;
};
