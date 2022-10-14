const DCAPI_ENDPOINT = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;
const DC_API_SEARCH_URL = `${DCAPI_ENDPOINT}/search`;
const DC_URL = process.env.DC_URL
  ? process.env.DC_URL
  : "https://devbox.library.northwestern.edu:3000";
const PRODUCTION_URL = "https://digitalcollections.library.northwestern.edu";

export { DC_URL, DCAPI_ENDPOINT, DC_API_SEARCH_URL, PRODUCTION_URL };
