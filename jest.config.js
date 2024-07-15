// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleDirectories: ["node_modules", "src"],
  //moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
