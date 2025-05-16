import { Aggs, ApiSearchRequestBody } from "@/types/api/request";
import {
  ApiResponseAggregation,
  ApiResponseBucket,
  ApiSearchResponse,
} from "@/types/api/response";
import { apiGetRequest, apiPostRequest } from "@/lib/dc-api";

import type { Collection } from "@nulib/dcapi-types";
import { DCAPI_ENDPOINT } from "./constants/endpoints";
import type { Visibility } from "@nulib/dcapi-types";
import { shuffle } from "@/lib/utils/array-helpers";

export type CollectionSearchResponse = Pick<
  Collection,
  | "id"
  | "title"
  | "description"
  | "thumbnail"
  | "representative_image"
  | "visibility"
>;

export type CollectionListShape = {
  description?: string | null;
  id: string;
  representativeImage: Collection["representative_image"];
  thumbnail?: string;
  title: string;
  totalWorks?: number;
  totalImage?: number;
  totalAudio?: number;
  totalVideo?: number;
  visibility: Visibility;
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
  id: string,
): Promise<Collection | undefined> {
  try {
    const response = await apiGetRequest<Collection>({
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/collections/${id}`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the collection", id);
  }
}

export async function getCollectionsData() {
  try {
    const response = await apiPostRequest<
      Record<"data", CollectionSearchResponse[]>
    >({
      url: `${DCAPI_ENDPOINT}/search/collections?size=200&sort=title:asc`,
      body: {
        _source: [
          "id",
          "title",
          "description",
          "thumbnail",
          "representative_image",
          "visibility",
        ],
        query: {
          match_all: {},
        },
      },
    });

    if (!response) {
      console.error("No collections found");
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching collections data", error);
    return [];
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
    const collections = await getCollectionsData();
    /** Get Work counts (Image / Audio / Video) for all Collections */
    const workCountMap = await getCollectionWorkCounts(
      collections.map((c) => c.id),
    );

    /** Stitch together only the Collection list info this page requires */
    collectionList = collections.map(
      ({
        description,
        id,
        representative_image,
        thumbnail,
        title,
        visibility,
      }) => {
        return {
          description: description,
          id: id,
          representativeImage: representative_image,
          thumbnail: thumbnail,
          title: title,
          visibility: visibility,
          ...(workCountMap && workCountMap[id]
            ? { ...workCountMap[id] }
            : { ...defaultCountTotals }),
        };
      },
    );

    return collectionList;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/* eslint sort-keys:0 */
/**
 * Perform an aggregation query to get the Work counts for an array of Collections
 *
 * @param collectionIds - Array of Collection IDs to get Work counts for; if empty array, query on all collections
 */
export async function getCollectionWorkCounts(
  collectionIds: string[] = [],
): Promise<CollectionWorkCountMap | null> {
  function getCount(
    buckets: ApiResponseBucket[],
    targetWorkType: "Audio" | "Image" | "Video",
  ) {
    const found = buckets.find((bucket) => bucket.key === targetWorkType);
    return found ? found.doc_count : 0;
  }

  /** Get data for specified Collections or all Collections if empty array */
  const body = {
    _source: ["id"],
    aggs: {
      collections: {
        terms: {
          field: "collection.id",
          size: collectionIds.length > 0 ? collectionIds.length : 10000,
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
    query:
      collectionIds.length > 0
        ? {
            bool: {
              should: collectionIds.map((id) => ({
                match: {
                  "collection.id": id,
                },
              })),
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

    const collectionAggregations =
      response?.aggregations as ApiResponseAggregation;

    const collectionBuckets = collectionAggregations?.collections?.buckets;
    if (!collectionBuckets || collectionBuckets.length === 0) {
      /** The Collections have no Works, send default zero counts */
      if (collectionIds.length > 0) {
        // Create an object with zero counts for each requested collection ID
        const emptyCountMap: CollectionWorkCountMap = {};
        collectionIds.forEach((id) => {
          emptyCountMap[id] = {
            totalWorks: 0,
            totalImage: 0,
            totalAudio: 0,
            totalVideo: 0,
          };
        });
        return emptyCountMap;
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

    // Add zero counts for any requested collection IDs that weren't returned in the results
    if (collectionIds.length > 0) {
      collectionIds.forEach((id) => {
        if (!countMap[id]) {
          countMap[id] = {
            totalWorks: 0,
            totalImage: 0,
            totalAudio: 0,
            totalVideo: 0,
          };
        }
      });
    }

    return countMap;
  } catch (err) {
    console.error("Error getting Collection work counts", err);
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
      const aggregations = response.aggregations as ApiResponseAggregation;

      return aggregations.collectionMetadata.buckets;
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
    _source: false,
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
      const aggregations = response.aggregations as ApiResponseAggregation;
      for (const [key, value] of Object.entries(aggregations)) {
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

/**
 * Determines if current router.pathname is a dynamic collection route
 */
export const isCollectionPage = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(Boolean); // Filter removes any empty strings

  return (
    pathSegments[0] === "collections" &&
    pathSegments[1] !== undefined &&
    pathSegments[1] !== ""
  );
};
