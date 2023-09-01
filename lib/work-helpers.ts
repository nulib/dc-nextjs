import { DCAPI_ENDPOINT, DC_API_SEARCH_URL } from "@/lib/constants/endpoints";

import type { Work } from "@nulib/dcapi-types";
import { apiGetRequest } from "@/lib/dc-api";
import { shuffle } from "@/lib/utils/array-helpers";

export async function getWork(id: string) {
  try {
    const response = await apiGetRequest<Work>({
      url: `${process.env.NEXT_PUBLIC_DCAPI_ENDPOINT}/works/${id}`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the work", id);
    return null;
  }
}

export async function getWorkManifest(id: string) {
  try {
    const response = await apiGetRequest({
      url: `${DC_API_SEARCH_URL}/works/${id}?as=iiif`,
    });
    return response;
  } catch (err) {
    console.error("Error getting the work", id);
    return null;
  }
}

export function getWorkSliders(work: Work) {
  if (!work) return;

  const workSliderUrls = [];

  /** Collection slider */
  if (work.collection) {
    const encodedCollectionLabel = encodeURIComponent(work.collection.title);
    const collectionSummary = `Collection`;
    workSliderUrls.push(
      `${DC_API_SEARCH_URL}?query=collection.id:"${work.collection.id}"&collectionLabel=${encodedCollectionLabel}&collectionSummary=${collectionSummary}&as=iiif`
    );
  }

  /** More Like This */
  const encodedSimilarLabel = encodeURIComponent(`Similar to ${work.title}`);
  workSliderUrls.push(
    `${DCAPI_ENDPOINT}/works/${work.id}/similar?collectionLabel=More Like This&collectionSummary=${encodedSimilarLabel}&as=iiif`
  );

  /**
   * Metadata (Subject for now)
   * Append `2` subject based IIIF collections
   */
  if (work.subject.length > 0) {
    const subjects = shuffle(work?.subject.map((s) => s.label)).slice(0, 2);

    subjects.forEach((subject: string) => {
      const encodedSubject = encodeURIComponent(subject);
      workSliderUrls.push(
        `${DC_API_SEARCH_URL}?query=subject.label:"${encodedSubject}"&collectionLabel=${encodedSubject}&collectionSummary=Subject&as=iiif`
      );
    });
  }

  return workSliderUrls;
}

export function isImageType(work_type: string | null | undefined) {
  return work_type === "Image";
}

export function isPublicWork(visibility: Work["visibility"]) {
  return visibility === "Public";
}
