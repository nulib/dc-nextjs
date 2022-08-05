import { ApiCollectionResponse, ApiSearchResponse } from "@/types/api/response";
import { CollectionShape } from "@/types/components/collections";
import { getAPIData } from "@/lib/dc-api";

// TODO: Just temp patch.  To be replaced by "process.env.NEXT_PUBLIC_DCAPI_ENDPOINT" when updated
export const v2TempEndpoint =
  "https://f3sfdthuaf.execute-api.us-east-1.amazonaws.com/v2/";

export async function getCollection(
  id: string
): Promise<CollectionShape | null> {
  try {
    const response = await getAPIData<ApiCollectionResponse>({
      method: "GET",
      url: `${v2TempEndpoint}/collections/${id}`,
    });
    return response ? response.data : null;
  } catch (err) {
    console.log("Error getting the work", id);
    return null;
  }
}

export async function getCollectionIds(): Promise<Array<string>> {
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
    query: {
      bool: {
        must: [
          {
            match: {
              "model.name": "Collection",
            },
          },
        ],
      },
    },
    size: 0,
  };

  const response = await getAPIData<ApiSearchResponse>({
    body,
    url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
  });

  if (response?.aggregations) {
    return response.aggregations[0].buckets.map((bucket) => bucket.key);
  }

  return [];
}

export async function getMetadataAggs(id: string, field: string) {
  const body = {
    _source: ["id"],
    aggs: {
      collectionSubjects: {
        terms: {
          field: field,
          order: {
            _key: "asc",
          },
          size: 10000,
        },
      },
    },
    query: {
      bool: {
        must: [
          {
            match: {
              "model.name": "Work",
            },
          },
          {
            match: {
              "collection.id": id,
            },
          },
        ],
      },
    },
    size: 0,
  };

  const response = await getAPIData<ApiSearchResponse>({
    body,
    url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
  });

  if (response?.aggregations) {
    return response.aggregations[0].buckets;
  }
  return null;
}
