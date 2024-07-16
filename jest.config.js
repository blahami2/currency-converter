// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/tests/unit/**/?(*.)+(spec|test).[tj]s?(x)", "**/tests/integration/**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleDirectories: ["node_modules", "src"],
  //moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
