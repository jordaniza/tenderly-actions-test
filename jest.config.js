/** @type {import('ts-jest').JestConfigWithTsJest} */

const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};