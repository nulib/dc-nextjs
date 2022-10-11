/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
    NUSSO_API_KEY: process.env.NUSSO_API_KEY,
    NUSSO_BASE_URL: process.env.NUSSO_BASE_URL,
  },
  images: {
    domains: [
      "dcapi.rdc.library.northwestern.edu",
      "dcapi.rdc-staging.library.northwestern.edu",
      "iiif.stack.rdc.library.northwestern.edu",
    ],
  },
  reactStrictMode: true,
  swcMinify: false,
};
