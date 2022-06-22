const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env": {
      "url": "https://flamboyant-allen-00cf47.netlify.app/"
      
    }
 
  },
});
