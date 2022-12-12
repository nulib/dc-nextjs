/** @type {import('next').NextConfig} */
module.exports = {
  env: {
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
