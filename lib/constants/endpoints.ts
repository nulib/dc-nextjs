const DCAPI_PRODUCTION_ENDPOINT =
  "https://api.dc.library.northwestern.edu/api/v2";

const IIIF_IMAGE_SERVICE_ENDPOINT =
  "https://iiif.dc.library.northwestern.edu/iiif/2";
const PRODUCTION_URL = "https://digitalcollections.library.northwestern.edu";

const DC_URL = process.env.NEXT_PUBLIC_DC_URL;
const DCAPI_ENDPOINT = process.env.NEXT_PUBLIC_DCAPI_ENDPOINT;

const DC_API_SEARCH_URL = `${DCAPI_ENDPOINT}/search`;
const DCAPI_CHAT_ENDPOINT = `${DCAPI_ENDPOINT}/chat/endpoint`;
const DCAPI_CHAT_FEEDBACK = `${DCAPI_ENDPOINT}/chat/feedback`;

export {
  DC_URL,
  DCAPI_CHAT_ENDPOINT,
  DCAPI_CHAT_FEEDBACK,
  DCAPI_ENDPOINT,
  DCAPI_PRODUCTION_ENDPOINT,
  DC_API_SEARCH_URL,
  IIIF_IMAGE_SERVICE_ENDPOINT,
  PRODUCTION_URL,
};
