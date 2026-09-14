/**
 * Template for /.well-known/ai-catalog.json
 *
 * The file is static except for the DC API endpoint, which varies by
 * environment. next.config.js renders this into public/.well-known/
 * at build time (see the Honeybadger config.vars.js pattern above it).
 */
module.exports = (dcapiEndpoint) => ({
  specVersion: "1.0",
  entries: [
    {
      identifier: "urn:air:nulib.github.com:dc-api:mcp-server",
      type: "application/mcp-server-card+json",
      url: `${dcapiEndpoint}/mcp/server-card`,
    },
  ],
});
