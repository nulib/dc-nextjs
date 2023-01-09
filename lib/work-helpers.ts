import { ApiSearchResponse, ApiWorkResponse } from "@/types/api/response";
import { DCAPI_ENDPOINT, DC_API_SEARCH_URL } from "@/lib/constants/endpoints";
import { WorkShape } from "@/types/components/works";
import { getAPIData } from "@/lib/dc-api";
import { shuffle } from "@/lib/utils/array-helpers";

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
          size: 1,
        },
      },
    },
    size: 0,
  };

  const response = await getAPIData<ApiSearchResponse>({
    body,
    url: `${DC_API_SEARCH_URL}/search`,
  });

  if (response?.aggregations?.allIds) {
    return response.aggregations.allIds.buckets.map((bucket) => bucket.key);
  }

  return [];
}

export async function getWorkManifest(id: string) {
  try {
    const response = await getAPIData({
      method: "GET",
      url: `${DC_API_SEARCH_URL}/works/${id}?as=iiif`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the work", id);
    return null;
  }
}

export function getWorkSliders(work: WorkShape) {
  if (!work) return;

  const workSliderUrls = [];

  /** Collection slider */
  const collectionLabel = work.collection.title;
  const collectionSummary = `Collection`;
  workSliderUrls.push(
    `${DC_API_SEARCH_URL}?query=collection.id:"${work.collection.id}"&collectionLabel=${collectionLabel}&collectionSummary=${collectionSummary}&as=iiif`
  );

  /** More Like This */
  const similarLabel = `Similar to ${work.title}`;
  workSliderUrls.push(
    `${DCAPI_ENDPOINT}/works/${work.id}/similar?collectionLabel=More Like This&collectionSummary=${similarLabel}&as=iiif`
  );

  /**
   * Metadata (Subject for now)
   * Append `2` subject based IIIF collections
   */
  if (work.subject.length > 0) {
    const subjects = shuffle(work?.subject.map((s) => s.label)).slice(0, 2);

    subjects.forEach((subject: string) => {
      workSliderUrls.push(
        `${DC_API_SEARCH_URL}?query=subject.label:"${subject}"&collectionLabel=${subject}&collectionSummary=Subject&as=iiif`
      );
    });
  }

  return workSliderUrls;
}

export function isImageType(work_type: string | undefined) {
  return work_type === "Image";
}

export function isPublicWork(visibility: string | undefined) {
  return visibility === "Public";
}
