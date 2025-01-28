const Helpers = {
    logSuccess: (message) => console.log(`✅ ${message}`),
    logError: (message) => console.error(`❌ ${message}`),
    logTable: (rows) => console.table(rows),
  };
  
  module.exports = Helpers;
  