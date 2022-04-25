import { DC_API_SEARCH_URL } from "@/lib/queries/endpoints";

/**
 * Wrapper for Elasticsearch API /search network requests
 */
async function getAPIData(body) {
  const response = await fetch(DC_API_SEARCH_URL, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data: any = await response.json();
  return data;
}

export { getAPIData };
