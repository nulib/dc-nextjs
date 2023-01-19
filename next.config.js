const HoneybadgerSourceMapPlugin = require("@honeybadger-io/webpack");

// Use the HoneybadgerSourceMapPlugin to upload the source maps during build step
const { HONEYBADGER_API_KEY, HONEYBADGER_ASSETS_URL, HONEYBADGER_REPORT_DATA } =
  process.env;
const NODE_ENV = process.env.HONEYBADGER_ENV || process.env.NODE_ENV;
const HONEYBADGER_REVISION = process.env.AWS_COMMIT_ID;

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    HONEYBADGER_API_KEY,
    HONEYBADGER_REPORT_DATA,
    HONEYBADGER_REVISION,
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
  webpack: (config) => {
    // When all the Honeybadger configuration env variables are
    // available/configured The Honeybadger webpack plugin gets pushed to the
    // webpack plugins to build and upload the source maps to Honeybadger.
    // This is an alternative to manually uploading the source maps.
    // See https://docs.honeybadger.io/lib/javascript/guides/using-source-maps.html
    // Note: This is disabled in development mode.
    if (
      HONEYBADGER_API_KEY &&
      HONEYBADGER_ASSETS_URL &&
      NODE_ENV === "production"
    ) {
      // `config.devtool` must be 'hidden-source-map' or 'source-map' to properly pass sourcemaps.
      // Next.js uses regular `source-map` which doesnt pass its sourcemaps to Webpack.
      // https://github.com/vercel/next.js/blob/89ec21ed686dd79a5770b5c669abaff8f55d8fef/packages/next/build/webpack/config/blocks/base.ts#L40
      // Use the hidden-source-map option when you don't want the source maps to be
      // publicly available on the servers, only to the error reporting
      config.devtool = "hidden-source-map";

      config.plugins.push(
        new HoneybadgerSourceMapPlugin({
          apiKey: HONEYBADGER_API_KEY,
          assetsUrl: HONEYBADGER_ASSETS_URL,
          revision: HONEYBADGER_REVISION,
        })
      );
    }

    return config;
  },
};
