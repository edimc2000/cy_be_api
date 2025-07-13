const { defineConfig } = require("cypress");
const oracledb = require("oracledb");
require("dotenv").config();

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  env: {
    baseUrl: 'https://api.techglobal-training.com/students',
    oracleDB: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_HOST,
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on("task", {
        
      });
    },
    baseUrl: process.env.BASE_URL
  },
});
