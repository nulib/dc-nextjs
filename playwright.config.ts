/* eslint sort-keys: "off" */

import { defineConfig, devices } from "@playwright/test";

/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const BASE_URL =
  process.env.BASE_URL || `https://devbox.library.northwestern.edu:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,

  /* Increase locator timeout past default 5s */
  expect: {
    timeout: 10 * 1500,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  reporter: "html",
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Increase the default timeout to 10 seconds. */
  timeout: 15000,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 6,

  use: {
    baseURL: BASE_URL,
    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], ignoreHTTPSErrors: true },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm run dev:ci",
  //   url: BASE_URL,
  //   timeout: 30 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
});
