const fs = require("fs");
const HoneybadgerSourceMapPlugin = require("@honeybadger-io/webpack");

// Use the HoneybadgerSourceMapPlugin to upload the source maps during build step
const {
  HONEYBADGER_API_KEY,
  HONEYBADGER_ENV,
  HONEYBADGER_REPORT_DATA,
  NEXT_PUBLIC_DC_URL,
} = process.env;

const NODE_ENV = process.env.HONEYBADGER_ENV || process.env.NODE_ENV;
const HONEYBADGER_REVISION =
  process.env.HONEYBADGER_REVISION || process.env.AWS_COMMIT_ID;

const HoneybadgerConfig = JSON.stringify(
  {
    HONEYBADGER_API_KEY,
    HONEYBADGER_ENV,
    HONEYBADGER_REPORT_DATA,
    HONEYBADGER_REVISION,
  },
  null,
  2,
);

fs.writeFileSync(
  "lib/honeybadger/config.vars.js",
  `module.exports = ${HoneybadgerConfig};`,
);

// Render /.well-known/ai-catalog.json into public/ so it ships as a static
// asset with the environment's DC API endpoint baked in.
const aiCatalog = require("./lib/well-known/ai-catalog");

fs.mkdirSync("public/.well-known", { recursive: true });
fs.writeFileSync(
  "public/.well-known/ai-catalog.json",
  JSON.stringify(aiCatalog(process.env.NEXT_PUBLIC_DCAPI_ENDPOINT), null, 2),
);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  env: {
    HONEYBADGER_API_KEY,
    HONEYBADGER_ENV,
    HONEYBADGER_REPORT_DATA,
    HONEYBADGER_REVISION,
    NUSSO_API_KEY: process.env.NUSSO_API_KEY,
    NUSSO_BASE_URL: process.env.NUSSO_BASE_URL,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  async headers() {
    return [
      {
        source: "/.well-known/ai-catalog.json",
        headers: [
          { key: "Content-Type", value: "application/ai-catalog+json" },
        ],
      },
      {
        source: "/:path*",
        headers: [{ key: "Permissions-Policy", value: "tools=(self)" }],
      },
    ];
  },
  images: {
    domains: [
      "dcapi.rdc.library.northwestern.edu",
      "dcapi.rdc-staging.library.northwestern.edu",
      "iiif.dc.library.northwestern.edu",
      "iiif.stack.rdc-staging.library.northwestern.edu",
      "api.dc.library.northwestern.edu",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    // When all the Honeybadger configuration env variables are
    // available/configured The Honeybadger webpack plugin gets pushed to the
    // webpack plugins to build and upload the source maps to Honeybadger.
    // This is an alternative to manually uploading the source maps.
    // See https://docs.honeybadger.io/lib/javascript/guides/using-source-maps.html
    // Note: This is disabled in development mode.

    if (
      HONEYBADGER_API_KEY &&
      (NODE_ENV === "production" || NODE_ENV === "staging")
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
          assetsUrl: `${NEXT_PUBLIC_DC_URL}/_next`,
          revision: HONEYBADGER_REVISION,
        }),
      );
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@samvera/clover-iiif/viewer": require.resolve(
        "./node_modules/@samvera/clover-iiif/dist/viewer/index.mjs",
      ),
    };

    return config;
  },
});
