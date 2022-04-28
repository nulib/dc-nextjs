import { ApiResponseAggregation } from "@/types/api/response";

export const mockAggregation: ApiResponseAggregation = {
  buckets: [
    {
      doc_count: 2,
      key: "Bar",
    },
    {
      doc_count: 1,
      key: "Baz",
    },
    {
      doc_count: 4,
      key: "Qux",
    },
  ],
  id: "foo",
};
