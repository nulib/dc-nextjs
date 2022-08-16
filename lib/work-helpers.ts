import { ApiSearchResponse, ApiWorkResponse } from "@/types/api/response";
import { getAPIData } from "@/lib/dc-api";

export async function getWork(id: string) {
  try {
    const response = await getAPIData<ApiWorkResponse>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/works/${id}`,
    });
    return response?.data;
  } catch (err) {
    console.error("Error getting the work", id);
    return null;
  }
}

export async function getWorkIds(): Promise<Array<string>> {
  const body = {
    _source: ["id"],
    aggs: {
      allIds: {
        terms: {
          field: "_id",
          order: {
            _count: "asc",
          },
          size: 100,
        },
      },
    },
    size: 0,
  };

  const response = await getAPIData<ApiSearchResponse>({
    body,
    url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
  });

  if (response?.aggregations?.allIds) {
    return response.aggregations.allIds.buckets.map((bucket) => bucket.key);
  }

  return [];
}
