import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "http://localhost:5173", // Adjust the base URL to match your development server
    headless: true, // Run tests in headless mode
  },
  webServer: {
    command: "npm run dev", // Command to start your development server
    port: 5173, // Port number where your app runs
  },
  testMatch: ["**/tests/e2e/**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
