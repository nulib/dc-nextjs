const DCAPI_CHAT_ENDPOINT =
  "https://api.dc.library.northwestern.edu/api/v2/chat-endpoint";
const DCAPI_ENDPOINT = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;
const DCAPI_PRODUCTION_ENDPOINT =
  "https://api.dc.library.northwestern.edu/api/v2";
const DC_API_SEARCH_URL = `${DCAPI_ENDPOINT}/search`;
const DC_URL = process.env.NEXT_PUBLIC_DC_URL;
const IIIF_IMAGE_SERVICE_ENDPOINT =
  "https://iiif.stack.rdc.library.northwestern.edu/iiif/2";
const PRODUCTION_URL = "https://digitalcollections.library.northwestern.edu";

export {
  DC_URL,
  DCAPI_CHAT_ENDPOINT,
  DCAPI_ENDPOINT,
  DCAPI_PRODUCTION_ENDPOINT,
  DC_API_SEARCH_URL,
  IIIF_IMAGE_SERVICE_ENDPOINT,
  PRODUCTION_URL,
};
