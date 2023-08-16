/**
 * Declare any modules here which don't have
 * types exported with their package.  Without
 * this, TypeScript complains.
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any;
  }
}
