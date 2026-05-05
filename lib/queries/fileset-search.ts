import { ApiSearchRequestBody } from "@/types/api/request";

export function buildFileSetQuery(
  term: string,
  visibility?: string[],
): ApiSearchRequestBody {
  const must: object[] = [
    { term: { "annotations.type": "transcription" } },
    { match_phrase: { "annotations.content": term } },
  ];

  if (visibility?.includes("Public")) {
    must.push({ term: { visibility: "Public" } });
  }

  return {
    query: { bool: { must } },
    size: 10,
    sort: [{ work_id: "asc" }, { _score: "desc" }],
  } as ApiSearchRequestBody;
}
