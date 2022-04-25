import { DC_API_SEARCH_URL } from "@/lib/queries/endpoints";
import { ApiResponse, DefaultSearchRequest } from "@/types/search";

/**
 * Wrapper for Elasticsearch API /search network requests
 */
async function getAPIData(body: DefaultSearchRequest): Promise<ApiResponse> {
  const response = await fetch(DC_API_SEARCH_URL, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data: ApiResponse = await response.json();
  return data;
}

export { getAPIData };
