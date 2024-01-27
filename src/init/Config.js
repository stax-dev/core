// Define the configuration for the application

// Import the dotenv package to read the .env file
require("dotenv-webpack").config();

// Load the .env file

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

export const Config = {
  db: {
    user: dbUser,
    pass: dbPass,
    host: dbHost,
    port: dbPort,
    name: "testing_for_sds",
  },
  service: {
    name: "Stax Developer Studios",
    company: "Stax",
    abbreviation: "SDS",
    version: "1.0.0",
    port: 3000,
  },
};
