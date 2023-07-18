/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};

// eslint-disable-next-line no-undef
transform = {
  "^.+\\.tsx?$": "ts-jest",
  "node_modules/axios/index.js": "babel-jest",
};
