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
    size: 40,
    collapse: {
      field: "work_id",
      inner_hits: {
        name: "matching_filesets",
        size: 40,
        sort: [{ _score: "desc" }],
      },
    },
  } as ApiSearchRequestBody;
}
