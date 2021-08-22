/*
 *Create and export configuration variables
 */

// Container for all the environments
const environments = {};

// Staging (defaule) environment
environments.staging = {
  httpPort: process.env.PORT || 3000,
  httpsPort: process.env.PORTS || 3001,
  envName: "staging",
  hashingSecret: "thisIsASecret",
  maxMails: 5,
  maxList: 5,
  templateGlobals: {
    appName: "EmailSender",
    companyName: "WellNotReally, Inc.",
    yearCreated: "2021",
    baseUrl: "0.0.0.0",
  },
};

// Production environment
environments.production = {
  httpPort: process.env.PORT || 5000,
  httpsPort: process.env.PORTS || 5001,
  envName: "production",
  hashingSecret: "thisIsAlsoASecret",
  maxMails: 5,
  maxList: 5,
  templateGlobals: {
    appName: "EmailSender",
    companyName: "WellNotReally, Inc.",
    yearCreated: "2021",
    baseUrl: "0.0.0.0",
  },
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// Export the module
module.exports = environmentToExport;
