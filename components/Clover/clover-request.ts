import type { CloverRequest } from "@nulib/clover";

const acceptsJson = (headers?: HeadersInit) =>
  /json/i.test(new Headers(headers).get("Accept") ?? "");

/**
 * Clover 4 applies one `request` to everything it fetches. DC's manifests,
 * image services, search and annotation pages need cookies for restricted
 * works, but static text resources (WebVTT transcripts under `/public/`)
 * answer `Access-Control-Allow-Origin: *`, which browsers refuse for
 * credentialed requests. Clover swallows that failure, leaving the Transcript
 * tab blank.
 *
 * Like Clover 3.x on DC, send credentials only with JSON requests (Clover sets
 * `Accept: application/json` on those) and fetch text without cross-origin
 * credentials. If a credentialed request is still rejected (a network or CORS
 * failure surfaces as a TypeError), retry it once without credentials.
 */
export const cloverFetch: typeof fetch = async (input, init = {}) => {
  const credentials: RequestCredentials | undefined =
    init.credentials === "include" && !acceptsJson(init.headers)
      ? "same-origin"
      : init.credentials;
  try {
    return await fetch(input, { ...init, credentials });
  } catch (error) {
    if (
      credentials !== "include" ||
      !(error instanceof TypeError) ||
      init.signal?.aborted
    )
      throw error;
    return fetch(input, { ...init, credentials: "same-origin" });
  }
};

export const CLOVER_REQUEST: CloverRequest = {
  credentials: "include",
  fetch: cloverFetch,
};
