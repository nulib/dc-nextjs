import { Aggs, ApiSearchRequestBody } from "@/types/api/request";
import { ApiResponseBucket, ApiSearchResponse } from "@/types/api/response";
import { apiGetRequest, apiPostRequest } from "@/lib/dc-api";
import { type CollectionShape } from "@/types/components/collections";
import { shuffle } from "@/lib/utils/array-helpers";

export async function getCollection(
  id: string
): Promise<CollectionShape | undefined> {
  try {
    const response = await apiGetRequest<CollectionShape>({
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/collections/${id}`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the collection", id);
  }
}

export async function getCollectionIds(): Promise<Array<string>> {
  const body = {
    _source: ["id"],
    query: {
      query_string: {
        query: "*",
      },
    },
    size: 1000,
  };

  try {
    const response = await apiPostRequest<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search/collections`,
    });
    return response?.data ? response?.data.map((item) => item.id) : [];
  } catch (err) {
    console.error("Error getting all Collection Ids", err);
    return [];
  }
}

export async function getCollectionWorkCount(collectionId: string) {
  const body = {
    _source: ["id"],
    query: {
      match: {
        "collection.id": collectionId,
      },
    },
    aggs: {},
    size: 0,
  };

  try {
    const response = await apiPostRequest<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
    });

    if (response?.pagination) {
      return response.pagination.total_hits;
    }
    return null;
  } catch (err) {
    console.error("Error getting Collection Work count", err);
  }
}

export type WorkTypeCountMap = {
  totalWorks: number;
  totalImage: number;
  totalAudio: number;
  totalVideo: number;
};
export type CollectionWorkCountMap = {
  [key: string]: WorkTypeCountMap;
};

/* eslint sort-keys:0 */
export async function getCollectionWorkCounts(collectionId = "") {
  function getCount(
    buckets: ApiResponseBucket[],
    targetWorkType: "Audio" | "Image" | "Video"
  ) {
    const found = buckets.find((bucket) => bucket.key === targetWorkType);
    return found ? found.doc_count : 0;
  }

  /** Get data for all Collections */
  const body = {
    _source: ["id"],
    aggs: {
      collections: {
        terms: {
          field: "collection.id",
          size: collectionId ? 1 : 10000,
        },
        aggs: {
          workTypes: {
            terms: {
              field: "work_type",
              size: 10,
            },
          },
        },
      },
    },
    query: collectionId
      ? {
          match: {
            "collection.id": collectionId,
          },
        }
      : {
          query_string: {
            query: "*",
          },
        },
    size: 0,
  };

  try {
    const response = await apiPostRequest<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
    });

    const collectionBuckets = response?.aggregations?.collections?.buckets;
    if (!collectionBuckets || collectionBuckets.length === 0) {
      /** The Collection has no Works, send default zero counts */
      if (collectionId) {
        return {
          [collectionId]: {
            audio: 0,
            image: 0,
            video: 0,
          },
        };
      }
      /** All Collections - something went wrong in API if this evaluates */
      return null;
    }

    const countMap: CollectionWorkCountMap = {};

    collectionBuckets.forEach((bucket) => {
      const workTypeBuckets = bucket.workTypes.buckets;
      const totalImage = getCount(workTypeBuckets, "Image");
      const totalAudio = getCount(workTypeBuckets, "Audio");
      const totalVideo = getCount(workTypeBuckets, "Video");

      countMap[bucket.key] = {
        totalWorks: bucket.doc_count,
        totalImage,
        totalAudio,
        totalVideo,
      };
    });

    return countMap;
  } catch (err) {
    console.error("Error getting Collection subjects", err);
    return null;
  }
}

export async function getMetadataAggs(collectionId: string, field: string) {
  const body = {
    _source: ["id"],
    aggs: {
      collectionMetadata: {
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
              "collection.id": collectionId,
            },
          },
        ],
      },
    },
    size: 0,
  } as ApiSearchRequestBody;

  try {
    const response = await apiPostRequest<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
    });

    if (response?.aggregations) {
      return response.aggregations.collectionMetadata.buckets;
    }
    return null;
  } catch (err) {
    console.error("Error getting Collection subjects", err);
  }
}

export type GenericAggsReturn = {
  key: string;
  doc_count: number;
};

type GetTopMetadataAggsParams = {
  collectionId: string;
  metadataFields: string[];
};

export type GetTopMetadataAggsReturn = {
  field: string;
  value: string[] | [];
};

export async function getTopMetadataAggs({
  collectionId,
  metadataFields,
}: GetTopMetadataAggsParams): Promise<GetTopMetadataAggsReturn[] | []> {
  if (!collectionId || !metadataFields) return [];

  const aggs: Aggs = {};

  metadataFields.forEach((field) => {
    aggs[field] = {
      terms: {
        field,
        size: 10,
      },
    };
  });

  const body = {
    aggs,
    query: {
      bool: {
        must: [
          {
            match: {
              "collection.id": collectionId,
            },
          },
        ],
      },
    },
    size: 0,
  };

  try {
    const topMetadata = [];
    const response = await apiPostRequest<ApiSearchResponse>({
      body,
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/search`,
    });

    if (response?.aggregations) {
      for (const [key, value] of Object.entries(response?.aggregations)) {
        topMetadata.push({
          field: key,
          value: shuffle(value.buckets.map((bucket) => bucket.key)).slice(0, 3),
        });
      }
    }
    return topMetadata;
  } catch (err) {
    console.error("Error getting Collection subjects", err);
    return [];
  }
}

/**
 * Specialized array helper for numerical string
 * sorting an array by the `key` property
 */
export const sortAggsByKey = (arr: GenericAggsReturn[]) => {
  const collator = new Intl.Collator("en", { numeric: true });
  return arr.sort(function (a, b) {
    return collator.compare(a.key, b.key);
  });
};
