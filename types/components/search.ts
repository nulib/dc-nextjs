import { ApiSearchResponse } from "@/types/api/response";

/**
 * Search response rendered to the UI
 */
export type SearchResultsState = {
  data: ApiSearchResponse | null;
  error: string | null;
  loading: boolean;
};
