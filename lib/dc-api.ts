import { DC_API_SEARCH_URL } from "@/lib/queries/endpoints";
import { ApiSearchResponse } from "@/types/api/response";
import { ApiSearchRequest } from "@/types/api/request";

/**
 * Wrapper for Elasticsearch API /search network requests
 */
async function getAPIData(body: ApiSearchRequest): Promise<ApiSearchResponse> {
  const response = await fetch(DC_API_SEARCH_URL, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data: ApiSearchResponse = await response.json();
  return data;
}

export { getAPIData };
