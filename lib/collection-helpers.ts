import { Aggs, ApiSearchRequestBody } from "@/types/api/request";
import { ApiResponseBucket, ApiSearchResponse } from "@/types/api/response";
import {
  type CollectionRepresentativeImage,
  type CollectionShape,
} from "@/types/components/collections";
import { apiGetRequest, apiPostRequest } from "@/lib/dc-api";
import { DCAPI_ENDPOINT } from "./constants/endpoints";
import { VisibilityStatus } from "@/types/components/works";
import { shuffle } from "@/lib/utils/array-helpers";

export type CollectionListShape = {
  description?: string;
  id: string;
  representativeImage: CollectionRepresentativeImage;
  thumbnail?: string;
  title: string;
  totalWorks?: number;
  totalImage?: number;
  totalAudio?: number;
  totalVideo?: number;
  visibility: VisibilityStatus;
};

export type CollectionWorkCountMap = {
  [key: string]: WorkTypeCountMap;
};

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

export type WorkTypeCountMap = {
  totalWorks: number;
  totalImage: number;
  totalAudio: number;
  totalVideo: number;
};

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

/** Get all Collections */
export async function getCollections() {
  let collectionList: CollectionListShape[] = [];
  const defaultCountTotals = {
    totalAudio: 0,
    totalImage: 0,
    totalVideo: 0,
    totalWorks: 0,
  };

  try {
    const collections = await apiGetRequest<CollectionShape[] | undefined>({
      url: `${DCAPI_ENDPOINT}/collections?size=200&sort=title:asc`,
    });

    if (!collections) return [];

    /** Get Work counts (Image / Audio / Video) for all Collections */
    const workCountMap = await getCollectionWorkCounts();

    /** Stitch together only the Collection list info this page requires */
    collectionList = collections.map((collection) => {
      return {
        description: collection.description,
        id: collection.id,
        representativeImage: collection.representative_image,
        thumbnail: collection.thumbnail,
        title: collection.title,
        visibility: collection.visibility,
        ...(workCountMap && workCountMap[collection.id]
          ? { ...workCountMap[collection.id] }
          : { ...defaultCountTotals }),
      };
    });

    return collectionList;
  } catch (err) {
    console.error(err);
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

/* eslint sort-keys:0 */
export async function getCollectionWorkCounts(
  collectionId = ""
): Promise<CollectionWorkCountMap | null> {
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
            totalWorks: 0,
            totalImage: 0,
            totalAudio: 0,
            totalVideo: 0,
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
