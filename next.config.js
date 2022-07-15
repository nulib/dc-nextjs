/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    NUSSO_API_KEY: process.env.NUSSO_API_KEY,
    NUSSO_BASE_URL: process.env.NUSSO_BASE_URL,
  },
  reactStrictMode: true,
};
