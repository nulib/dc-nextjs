import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://devbox.library.northwestern.edu:3000",
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
