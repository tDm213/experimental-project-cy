const { defineConfig } = require("cypress");
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    videoCompression: false,
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      runMode: 2,
      // Configure retry attempts for `cypress open`
      // Default is 0
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      require("./cypress/plugins/index.js")(on, config);
      AllureWriter(on, config);
      return config;
    },
  },
  projectId: "iyfq1k",
});
