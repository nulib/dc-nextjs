import { ApiCollectionResponse, ApiSearchResponse } from "@/types/api/response";
import { CollectionShape } from "@/types/components/collections";
import { getAPIData } from "@/lib/dc-api";

export async function getCollection(
  id: string
): Promise<CollectionShape | null> {
  try {
    const response = await getAPIData<ApiCollectionResponse>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/collections/${id}`,
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

  try {
    const response = await getAPIData<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
    });

    if (response?.aggregations) {
      return response.aggregations.allIds.buckets.map((bucket) => bucket.key);
    }
    return [];
  } catch (err) {
    console.error("Error getting all Collection Ids", err);
    return [];
  }
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
              "collection.id": id,
            },
          },
        ],
      },
    },
    size: 0,
  };

  try {
    const response = await getAPIData<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
    });

    if (response?.aggregations) {
      return response.aggregations.collectionSubjects.buckets;
    }
    return null;
  } catch (err) {
    console.error("Error getting Collection subjects", err);
  }
}
